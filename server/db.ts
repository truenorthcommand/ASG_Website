import { users, blogPosts, blogPostEdits } from "../drizzle/schema";
import { eq, desc, and } from "drizzle-orm";
import { getDatabase } from "./_core/db";

// ============================================================================
// User Queries
// ============================================================================

export async function getUserById(id: number) {
  const db = getDatabase();
  const result = await db.select().from(users).where(eq(users.id, id));
  return result[0] || null;
}

export async function getUserByUsername(username: string) {
  const db = getDatabase();
  const result = await db.select().from(users).where(eq(users.username, username));
  return result[0] || null;
}

export async function getUserByEmail(email: string) {
  const db = getDatabase();
  const result = await db.select().from(users).where(eq(users.email, email));
  return result[0] || null;
}

export async function createUser(data: {
  username: string;
  passwordHash: string;
  name?: string;
  email?: string;
  role?: "user" | "admin";
}) {
  const db = getDatabase();
  await db.insert(users).values(data);
  const result = await db.select().from(users).where(eq(users.username, data.username));
  return result[0] || null;
}

export async function updateUser(id: number, data: Partial<typeof users.$inferInsert>) {
  const db = getDatabase();
  await db.update(users).set(data).where(eq(users.id, id));
  const result = await db.select().from(users).where(eq(users.id, id));
  return result[0] || null;
}

export async function updateUserPassword(id: number, passwordHash: string) {
  const db = getDatabase();
  await db.update(users).set({ passwordHash, updatedAt: new Date() }).where(eq(users.id, id));
  const result = await db.select().from(users).where(eq(users.id, id));
  return result[0] || null;
}

export async function updateUserLastSignedIn(id: number) {
  const db = getDatabase();
  await db.update(users).set({ lastSignedIn: new Date() }).where(eq(users.id, id));
  return null;
}

// ============================================================================
// Blog Post Queries
// ============================================================================

export async function getBlogPostById(id: number) {
  const db = getDatabase();
  const result = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
  return result[0] || null;
}

export async function getBlogPostBySlug(slug: string) {
  const db = getDatabase();
  const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
  return result[0] || null;
}

export async function getBlogPostsByStatus(status: "draft" | "scheduled" | "published") {
  const db = getDatabase();
  return await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.status, status))
    .orderBy(desc(blogPosts.publishDate));
}

export async function getDraftPosts() {
  return getBlogPostsByStatus("draft");
}

export async function getScheduledPosts() {
  return getBlogPostsByStatus("scheduled");
}

export async function getPublishedPosts(limit = 20) {
  const db = getDatabase();
  return await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"))
    .orderBy(desc(blogPosts.publishDate))
    .limit(limit);
}

export async function getBlogPostsByCategory(category: "maintenance" | "case-study" | "emergency") {
  const db = getDatabase();
  return await db
    .select()
    .from(blogPosts)
    .where(and(eq(blogPosts.category, category), eq(blogPosts.status, "published")))
    .orderBy(desc(blogPosts.publishDate));
}

export async function getRelatedBlogPosts(slug: string, limit = 3) {
  const post = await getBlogPostBySlug(slug);
  if (!post) return [];

  const db = getDatabase();
  const results = await db
    .select()
    .from(blogPosts)
    .where(
      and(
        eq(blogPosts.category, post.category),
        eq(blogPosts.status, "published")
      )
    )
    .orderBy(desc(blogPosts.publishDate))
    .limit(limit + 1); // Get one extra to filter out current post
  return results.filter((p: any) => p.id !== post.id).slice(0, limit);
}

export async function createBlogPost(data: typeof blogPosts.$inferInsert) {
  const db = getDatabase();
  await db.insert(blogPosts).values(data);
  const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, data.slug!));
  return result[0] || null;
}

export async function updateBlogPost(id: number, data: Partial<typeof blogPosts.$inferInsert>) {
  const db = getDatabase();
  await db
    .update(blogPosts)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(blogPosts.id, id));
  const result = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
  return result[0] || null;
}

export async function deleteBlogPost(id: number) {
  const db = getDatabase();
  return db.delete(blogPosts).where(eq(blogPosts.id, id));
}

export async function publishBlogPost(id: number, publishDate: Date = new Date()) {
  return updateBlogPost(id, {
    status: "published",
    publishDate,
  });
}

export async function scheduleBlogPost(id: number, publishDate: Date) {
  return updateBlogPost(id, {
    status: "scheduled",
    publishDate,
  });
}

export async function incrementBlogPostViews(id: number) {
  const post = await getBlogPostById(id);
  if (!post) return null;

  return updateBlogPost(id, {
    views: (post.views || 0) + 1,
  });
}

// ============================================================================
// Blog Post Edit History (Audit Trail)
// ============================================================================

export async function createBlogPostEdit(data: typeof blogPostEdits.$inferInsert) {
  const db = getDatabase();
  await db.insert(blogPostEdits).values(data);
  return null;
}

export async function getEditHistory(postId: number) {
  const db = getDatabase();
  return await db
    .select()
    .from(blogPostEdits)
    .where(eq(blogPostEdits.postId, postId))
    .orderBy(desc(blogPostEdits.createdAt));
}
