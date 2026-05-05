import { COOKIE_NAME } from "@shared/const";
import { ForbiddenError } from "@shared/_core/errors";
import type { Request } from "express";
import { SignJWT, jwtVerify } from "jose";
import type { User } from "../../drizzle/schema";
import * as db from "../db";
import * as auth from "../auth";
import { ENV } from "./env";

// Re-export auth types for backward compatibility
export type SessionPayload = auth.SessionPayload;

class SDKServer {
  /**
   * Sign a JWT session token
   * @deprecated Use auth.createSessionToken instead
   */
  async signSession(
    payload: SessionPayload,
    options: { expiresInMs?: number } = {}
  ): Promise<string> {
    return auth.createSessionToken(payload, options);
  }

  /**
   * Verify a JWT session token
   * @deprecated Use auth.verifySessionToken instead
   */
  async verifySession(
    cookieValue: string | undefined | null
  ): Promise<SessionPayload | null> {
    return auth.verifySessionToken(cookieValue);
  }

  /**
   * Authenticate an incoming request
   * Verifies the session cookie and returns the authenticated user
   * Throws ForbiddenError if authentication fails
   */
  async authenticateRequest(req: Request): Promise<User> {
    return auth.authenticateRequest(req);
  }

  /**
   * Get session from request
   * @deprecated Use auth.getSessionFromRequest instead
   */
  async getSessionFromRequest(req: Request): Promise<SessionPayload | null> {
    return auth.getSessionFromRequest(req);
  }
}

export const sdk = new SDKServer();
