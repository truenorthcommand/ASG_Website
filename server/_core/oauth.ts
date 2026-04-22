import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import type { Express, Request, Response } from "express";
import * as db from "../db";
import { getSessionCookieOptions } from "./cookies";
import { sdk } from "./sdk";

function getQueryParam(req: Request, key: string): string | undefined {
  const value = req.query[key];
  return typeof value === "string" ? value : undefined;
}

export function registerOAuthRoutes(app: Express) {
  app.get("/api/oauth/callback", async (req: Request, res: Response) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");

    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }

    try {
      console.log("[OAuth] Callback received with code:", code?.substring(0, 20), "... state:", state?.substring(0, 20), "...");
      
      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      console.log("[OAuth] Token exchange successful");
      
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
      console.log("[OAuth] User info retrieved:", { openId: userInfo.openId, email: userInfo.email });

      if (!userInfo.openId) {
        console.error("[OAuth] openId missing from user info");
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }

      await db.upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
        lastSignedIn: new Date(),
      });
      console.log("[OAuth] User upserted successfully");

      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS,
      });
      console.log("[OAuth] Session token created");

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      console.log("[OAuth] Cookie set, redirecting to admin/blog");

      // Redirect to admin blog - the ProtectedAdminRoute will check if user is admin
      res.redirect(302, "/admin/blog");
    } catch (error) {
      console.error("[OAuth] Callback failed:", error instanceof Error ? error.message : error);
      if (error instanceof Error) {
        console.error("[OAuth] Error stack:", error.stack);
      }
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}
