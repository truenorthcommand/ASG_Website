import { describe, it, expect, beforeAll } from "vitest";
import { initializeDatabase } from "../_core/db";
import * as db from "../db";

describe("Blog E2E Tests", () => {
  beforeAll(async () => {
    await initializeDatabase();
  });

  it("should fetch published blog posts", async () => {
    const result = await db.getPublishedPosts(100);
    console.log("Published posts:", result);
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("should fetch a blog post by slug", async () => {
    // First get all posts to find a valid slug
    const allPosts = await db.getPublishedPosts(100);
    expect(allPosts.length).toBeGreaterThan(0);
    const firstPost = allPosts[0];
    console.log("First post:", firstPost);

    // Now try to fetch by slug
    const result = await db.getBlogPostBySlug(firstPost.slug);
    console.log("getBySlug result:", result);
    expect(result).toBeDefined();
    expect(result.slug).toBe(firstPost.slug);
    expect(result.status).toBe("published");
  });

  it("should return null for non-existent slug", async () => {
    const result = await db.getBlogPostBySlug("non-existent-post-xyz");
    expect(result).toBeNull();
  });

  it("should fetch related posts", async () => {
    // First get all posts
    const allPosts = await db.getPublishedPosts(100);
    expect(allPosts.length).toBeGreaterThan(0);
    const firstPost = allPosts[0];

    // Fetch related posts
    const result = await db.getRelatedBlogPosts(firstPost.slug, 3);
    console.log("getRelated result:", result);
    expect(Array.isArray(result)).toBe(true);
  });
});
