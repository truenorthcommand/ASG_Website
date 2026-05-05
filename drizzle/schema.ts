import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, index } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Updated for Railway standalone with username/password authentication.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Username for login. Unique per user. */
  username: varchar("username", { length: 64 }).notNull().unique(),
  /** Bcrypt hashed password */
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Blog posts table for AI-first content with HITL admin dashboard
 */
export const blogPosts = mysqlTable(
  "blog_posts",
  {
    id: int("id").autoincrement().primaryKey(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    title: text("title").notNull(),
    excerpt: text("excerpt").notNull(),
    content: text("content").notNull(), // Markdown format
    category: mysqlEnum("category", ["maintenance", "case-study", "emergency"]).notNull(),
    featuredImage: varchar("featured_image", { length: 500 }).notNull(), // Local or CDN URL
    metaDescription: varchar("meta_description", { length: 160 }).notNull(), // SEO
    readTime: int("read_time").notNull(), // minutes
    author: mysqlEnum("author", ["AI", "Human"]).default("Human").notNull(),
    status: mysqlEnum("status", ["draft", "scheduled", "published"]).default("draft").notNull(),
    publishDate: timestamp("publish_date").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    editedBy: int("edited_by"), // User ID of last editor
    views: int("views").default(0), // Analytics
  },
  (table) => ({
    slugIdx: index("blog_slug_idx").on(table.slug),
    statusIdx: index("blog_status_idx").on(table.status),
    categoryIdx: index("blog_category_idx").on(table.category),
    publishDateIdx: index("blog_publish_date_idx").on(table.publishDate),
  })
);

/**
 * Blog post edits history for audit trail
 */
export const blogPostEdits = mysqlTable(
  "blog_post_edits",
  {
    id: int("id").autoincrement().primaryKey(),
    postId: int("post_id").notNull().references(() => blogPosts.id, { onDelete: "cascade" }),
    editedBy: int("edited_by").notNull().references(() => users.id),
    changesSummary: text("changes_summary"), // What changed
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    postIdIdx: index("blog_edits_post_id_idx").on(table.postId),
  })
);

export type BlogPost = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;
export type BlogPostEdit = typeof blogPostEdits.$inferSelect;
export type NewBlogPostEdit = typeof blogPostEdits.$inferInsert;
