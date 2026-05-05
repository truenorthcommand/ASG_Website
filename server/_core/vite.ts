import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import path from "path";

/**
 * Serve static files in production mode.
 * Uses process.cwd() for reliable path resolution in bundled ESM builds.
 * import.meta.dirname is undefined when code is bundled by Vite/esbuild.
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

/**
 * Setup Vite dev server - only called in development mode.
 * Uses dynamic import to avoid loading vite and vite.config in production.
 */
export async function setupVite(app: Express, server: Server) {
  // Dynamic imports to prevent vite.config.ts (which uses import.meta.dirname)
  // from being evaluated in the production bundle
  const nanoidModule = await import("nanoid");
  const nanoid = nanoidModule.nanoid;
  const viteModule = await import("vite");
  const createViteServer = viteModule.createServer;
  const viteConfigModule = await import("../../vite.config");
  const viteConfig = viteConfigModule.default;

  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        process.cwd(),
        "client",
        "index.html"
      );

      // always reload the index.html file from disk in case it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}
