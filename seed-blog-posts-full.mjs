import { initializeDatabase, db } from './server/_core/db.ts';
import { blogPosts } from './drizzle/schema.ts';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read markdown files and extract content
function readMarkdownContent(filePath) {
  const fullPath = path.join(__dirname, filePath);
  const content = fs.readFileSync(fullPath, 'utf-8');
  return content;
}

const posts = [
  {
    title: 'Why Property Maintenance Emergencies Happen at 2 AM (And How to Prevent Them)',
    slug: 'why-emergencies-happen-at-2am',
    excerpt: 'Learn why 70% of emergency repairs could have been prevented with basic maintenance, and discover practical prevention strategies.',
    category: 'maintenance',
    featuredImage: 'https://cdn.adaptservicesgroup.co.uk/blog/emergency-prevention.jpg',
    metaDescription: 'Prevent emergency property repairs. Learn why 70% of emergencies could be avoided with basic maintenance.',
    readTime: 6,
    author: 'Human',
    status: 'published',
    publishDate: new Date('2026-03-25'),
    content: readMarkdownContent('blog-posts/post-1-emergency-prevention.md'),
  },
  {
    title: 'The Hidden Cost of Reactive vs. Proactive Property Maintenance',
    slug: 'reactive-vs-proactive-maintenance',
    excerpt: 'Discover why reactive maintenance costs 3-4x more than proactive maintenance over 5 years, and how to switch strategies.',
    category: 'maintenance',
    featuredImage: 'https://cdn.adaptservicesgroup.co.uk/blog/reactive-proactive.jpg',
    metaDescription: 'Reactive vs proactive maintenance: Why proactive costs 75% less over 5 years. ROI analysis and practical guide.',
    readTime: 7,
    author: 'Human',
    status: 'published',
    publishDate: new Date('2026-03-25'),
    content: readMarkdownContent('blog-posts/post-2-reactive-vs-proactive.md'),
  },
  {
    title: 'What Property Managers Need to Know About Compliance & Safety Standards',
    slug: 'compliance-safety-standards',
    excerpt: 'Essential guide to UK rental property compliance: gas safety, electrical inspections, damp prevention, and more.',
    category: 'maintenance',
    featuredImage: 'https://cdn.adaptservicesgroup.co.uk/blog/compliance-standards.jpg',
    metaDescription: 'UK rental property compliance guide: Gas safety, EICR, legionella, damp, fire safety. Penalties and deadlines.',
    readTime: 8,
    author: 'Human',
    status: 'published',
    publishDate: new Date('2026-03-25'),
    content: readMarkdownContent('blog-posts/post-3-compliance-safety.md'),
  },
  {
    title: 'Emergency Response Case Study: How We Fixed a Catastrophic Leak in 90 Minutes',
    slug: 'emergency-response-leak-case-study',
    excerpt: 'Real case study: A midnight emergency call, a corroded pipe, and how quick response prevented £12,000+ in damage.',
    category: 'case-study',
    featuredImage: 'https://cdn.adaptservicesgroup.co.uk/blog/leak-case-study.jpg',
    metaDescription: 'Emergency response case study: 90-minute response prevented £12,000 in damage. Real example of fast, effective problem-solving.',
    readTime: 5,
    author: 'Human',
    status: 'published',
    publishDate: new Date('2026-03-25'),
    content: readMarkdownContent('blog-posts/post-4-case-study-emergency.md'),
  },
];

async function seedBlogPosts() {
  try {
    console.log('Initializing database...');
    await initializeDatabase();
    
    // Delete existing posts to avoid duplicates
    console.log('Clearing existing blog posts...');
    await db.delete(blogPosts);
    
    console.log('Starting blog post seeding with full content...');
    
    for (const post of posts) {
      const contentLength = post.content.length;
      console.log(`Seeding: ${post.title} (${contentLength} characters)`);
      
      await db.insert(blogPosts).values({
        ...post,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log(`✓ Seeded: ${post.title}`);
    }
    
    console.log('\n✅ All 4 blog posts seeded successfully with full content!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding blog posts:', error);
    process.exit(1);
  }
}

seedBlogPosts();
