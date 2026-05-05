/**
 * Seed script to create initial admin user for Railway deployment
 * Run this after deploying to Railway and running database migrations
 * 
 * Usage: node seed-admin.mjs
 */

import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import { users } from "./drizzle/schema.ts";
import { eq } from "drizzle-orm";

const ADMIN_USERNAME = "matthewcottam";
const ADMIN_PASSWORD = "Oakley123!";
const ADMIN_EMAIL = "info@adaptservicesgroup.co.uk";
const ADMIN_NAME = "Adapt Services Group";
const SALT_ROUNDS = 10;

async function seedAdmin() {
  console.log("🚀 Starting admin user seed script...");

  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL environment variable is required");
    process.exit(1);
  }

  console.log("📦 Connecting to database...");
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  const db = drizzle(connection);

  try {
    // Check if admin user already exists
    console.log(`🔍 Checking if user '${ADMIN_USERNAME}' already exists...`);
    const existingUsers = await db
      .select()
      .from(users)
      .where(eq(users.username, ADMIN_USERNAME));

    if (existingUsers.length > 0) {
      console.log(`⚠️  User '${ADMIN_USERNAME}' already exists. Skipping creation.`);
      console.log("✅ Admin user is ready!");
      process.exit(0);
    }

    // Hash the password
    console.log("🔐 Hashing password...");
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, SALT_ROUNDS);

    // Create admin user
    console.log("👤 Creating admin user...");
    await db.insert(users).values({
      username: ADMIN_USERNAME,
      passwordHash,
      email: ADMIN_EMAIL,
      name: ADMIN_NAME,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    });

    console.log("\n✅ Admin user created successfully!");
    console.log("\n📋 Login Credentials:");
    console.log(`   Username: ${ADMIN_USERNAME}`);
    console.log(`   Password: ${ADMIN_PASSWORD}`);
    console.log(`   Email: ${ADMIN_EMAIL}`);
    console.log(`   Role: admin`);
    console.log("\n🌐 You can now log in at: /admin/login\n");
  } catch (error) {
    console.error("❌ Error seeding admin user:", error);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

seedAdmin();
