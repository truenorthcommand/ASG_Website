import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import helmet from "helmet";
import multer from "multer";
import path from "path";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { initializeDatabase } from "./db";
import * as auth from "../auth";
import { getUploadDir } from "../storage";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

// Configure multer for file uploads
const upload = multer({
  dest: getUploadDir(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max file size
  },
});

async function startServer() {
  // Initialize database connection first
  try {
    await initializeDatabase();
  } catch (error) {
    console.error("[Server] Failed to initialize database:", error);
    process.exit(1);
  }

  const app = express();
  const server = createServer(app);
  
  // Helmet security middleware
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: [
            "'self'",
            "'unsafe-inline'",
            "'unsafe-eval'",
            "https://cdn.jsdelivr.net",
            "https://fonts.googleapis.com",
          ],
          styleSrc: [
            "'self'",
            "'unsafe-inline'",
            "https://fonts.googleapis.com",
          ],
          imgSrc: ["'self'", "data:", "https:"],
          fontSrc: ["'self'", "https://fonts.gstatic.com"],
          connectSrc: ["'self'", "https:", "ws:", "wss:"],
          frameSrc: ["'self'"],
        },
      },
      // Relax for development
      ...(process.env.NODE_ENV === "development" && {
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
      }),
    })
  );
  
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  
  // Serve uploaded files statically
  app.use("/uploads", express.static(getUploadDir()));
  
  // Auth routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        res.status(400).json({ error: "Username and password are required" });
        return;
      }
      
      const user = await auth.authenticateUser(username, password);
      
      if (!user) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }
      
      const sessionToken = await auth.createSessionToken({
        userId: user.id,
        username: user.username,
        role: user.role,
      });
      
      auth.setSessionCookie(req, res, sessionToken);
      
      res.json({
        success: true,
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("[Auth] Login failed:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });
  
  app.post("/api/auth/logout", (req, res) => {
    auth.clearSessionCookie(req, res);
    res.json({ success: true });
  });
  
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
