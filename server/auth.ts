import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import type { Request, Response } from "express";
import * as db from "./db";
import { parse as parseCookieHeader } from "cookie";
import { getSessionCookieOptions } from "./_core/cookies";
import { ForbiddenError } from "@shared/_core/errors";
import type { User } from "../drizzle/schema";

const SALT_ROUNDS = 10;

/**
 * Get JWT secret from environment
 */
function getJWTSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET || process.env.COOKIE_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET or COOKIE_SECRET environment variable is required");
  }
  return new TextEncoder().encode(secret);
}

/**
 * Session payload for JWT tokens
 */
export type SessionPayload = {
  userId: number;
  username: string;
  role: "user" | "admin";
};

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Create a JWT session token
 */
export async function createSessionToken(
  payload: SessionPayload,
  options: { expiresInMs?: number } = {}
): Promise<string> {
  const issuedAt = Date.now();
  const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
  const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1000);
  const secretKey = getJWTSecret();

  return new SignJWT({
    userId: payload.userId,
    username: payload.username,
    role: payload.role,
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(expirationSeconds)
    .sign(secretKey);
}

/**
 * Verify a JWT session token
 */
export async function verifySessionToken(
  token: string | undefined | null
): Promise<SessionPayload | null> {
  if (!token) {
    console.warn("[Auth] Missing session token");
    return null;
  }

  try {
    const secretKey = getJWTSecret();
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: ["HS256"],
    });

    const { userId, username, role } = payload as Record<string, unknown>;

    if (
      typeof userId !== "number" ||
      typeof username !== "string" ||
      (role !== "user" && role !== "admin")
    ) {
      console.warn("[Auth] Session payload missing required fields");
      return null;
    }

    return {
      userId,
      username,
      role,
    };
  } catch (error) {
    console.warn("[Auth] Session verification failed", String(error));
    return null;
  }
}

/**
 * Authenticate a user with username and password
 */
export async function authenticateUser(
  username: string,
  password: string
): Promise<User | null> {
  const user = await db.getUserByUsername(username);
  if (!user) {
    console.warn(`[Auth] User not found: ${username}`);
    return null;
  }

  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) {
    console.warn(`[Auth] Invalid password for user: ${username}`);
    return null;
  }

  // Update last signed in timestamp
  await db.updateUserLastSignedIn(user.id);

  return user;
}

/**
 * Set session cookie in response
 */
export function setSessionCookie(
  req: Request,
  res: Response,
  sessionToken: string,
  maxAge: number = ONE_YEAR_MS
): void {
  const cookieOptions = getSessionCookieOptions(req);
  res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge });
}

/**
 * Clear session cookie
 */
export function clearSessionCookie(req: Request, res: Response): void {
  const cookieOptions = getSessionCookieOptions(req);
  res.clearCookie(COOKIE_NAME, cookieOptions);
}

/**
 * Parse cookies from request headers
 */
function parseCookies(cookieHeader: string | undefined): Map<string, string> {
  if (!cookieHeader) {
    return new Map<string, string>();
  }
  const parsed = parseCookieHeader(cookieHeader);
  return new Map(Object.entries(parsed));
}

/**
 * Get session from request cookies
 */
export async function getSessionFromRequest(
  req: Request
): Promise<SessionPayload | null> {
  const cookies = parseCookies(req.headers.cookie);
  const sessionCookie = cookies.get(COOKIE_NAME);
  return verifySessionToken(sessionCookie);
}

/**
 * Authenticate request and return user
 * Throws ForbiddenError if authentication fails
 */
export async function authenticateRequest(req: Request): Promise<User> {
  const session = await getSessionFromRequest(req);

  if (!session) {
    throw ForbiddenError("Invalid or missing session cookie");
  }

  const user = await db.getUserById(session.userId);

  if (!user) {
    throw ForbiddenError("User not found");
  }

  return user;
}

/**
 * Require admin role middleware helper
 */
export async function requireAdmin(req: Request): Promise<User> {
  const user = await authenticateRequest(req);

  if (user.role !== "admin") {
    throw ForbiddenError("Admin access required");
  }

  return user;
}
