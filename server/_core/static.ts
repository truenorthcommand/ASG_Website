import express, { type Express } from "express";
import fs from "fs";
import path from "path";

/**
 * Serve static files in production mode.
 * Uses process.cwd() for reliable path resolution in bundled ESM builds.
 * This file is intentionally separate from vite.ts to avoid importing
 * vite.config.ts (which uses import.meta.dirname) into the production bundle.
 */
export function serveStatic(app: Express) {
  const distPath = path.resolve(process.cwd(), "dist", "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
