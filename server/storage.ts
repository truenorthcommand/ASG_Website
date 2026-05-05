// Local filesystem storage for Railway deployment
// Uses multer for file uploads and stores files in /uploads directory

import fs from "fs/promises";
import path from "path";

// Use process.cwd() for reliable path resolution in production
// Railway deploys to /app, so uploads will be at /app/uploads
const UPLOAD_DIR = path.join(process.cwd(), "uploads");

/**
 * Ensure upload directory exists
 */
async function ensureUploadDir(): Promise<void> {
  try {
    await fs.access(UPLOAD_DIR);
  } catch {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  }
}

/**
 * Normalize file key (remove leading slashes)
 */
function normalizeKey(relKey: string): string {
  return relKey.replace(/^\/+/, "");
}

/**
 * Store a file in the local filesystem
 * @param relKey - Relative path/filename for the file
 * @param data - File data as Buffer, Uint8Array, or string
 * @param contentType - MIME type (not used for local storage but kept for interface compatibility)
 * @returns Object with key and public URL
 */
export async function storagePut(
  relKey: string,
  data: Buffer | Uint8Array | string,
  contentType = "application/octet-stream"
): Promise<{ key: string; url: string }> {
  await ensureUploadDir();
  
  const key = normalizeKey(relKey);
  const filePath = path.join(UPLOAD_DIR, key);
  
  // Ensure subdirectories exist
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });
  
  // Convert data to Buffer if needed
  const buffer = typeof data === "string" 
    ? Buffer.from(data, "utf-8") 
    : Buffer.from(data);
  
  // Write file
  await fs.writeFile(filePath, buffer);
  
  // Return public URL (served by Express static middleware)
  const url = `/uploads/${key}`;
  
  return { key, url };
}

/**
 * Get a file's public URL from the local filesystem
 * @param relKey - Relative path/filename for the file
 * @returns Object with key and public URL
 */
export async function storageGet(
  relKey: string
): Promise<{ key: string; url: string }> {
  const key = normalizeKey(relKey);
  const filePath = path.join(UPLOAD_DIR, key);
  
  // Check if file exists
  try {
    await fs.access(filePath);
  } catch {
    throw new Error(`File not found: ${key}`);
  }
  
  // Return public URL
  const url = `/uploads/${key}`;
  
  return { key, url };
}

/**
 * Get the absolute path to the uploads directory
 * Used for configuring multer
 */
export function getUploadDir(): string {
  return UPLOAD_DIR;
}
