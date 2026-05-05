# ASG Website - Railway Standalone Edition

**Adapt Services Group** corporate website and blog platform, migrated from Manus to Railway with username/password authentication.

## 🎯 Overview

This is a production-ready standalone version of the ASG website, fully independent from the Manus platform. It features:

- ✅ **Full website** with all pages (Home, Services, Sectors, About, Contact, Blog, etc.)
- ✅ **Admin dashboard** for blog management with username/password authentication
- ✅ **Railway-optimized** for easy deployment with MySQL database
- ✅ **Local file storage** using Railway persistent volumes
- ✅ **Production-ready** with security headers, proper error handling, and logging

## 📦 Technology Stack

### Frontend
- React 19 + TypeScript
- Vite (build tool)
- TailwindCSS (styling)
- Radix UI (component library)
- Wouter (routing)
- TanStack Query (data fetching)

### Backend
- Node.js + Express
- tRPC (type-safe API)
- JWT authentication (jose library)
- bcrypt (password hashing)
- MySQL (via Drizzle ORM)
- Multer (file uploads)
- Helmet (security)

### Database
- MySQL 8.0+
- Drizzle ORM
- Auto-managed by Railway MySQL plugin

## 🚀 Railway Deployment Guide

### Prerequisites

1. **Railway Account**
   - Sign up at [railway.app](https://railway.app)
   - Pro plan required ($20/month) for persistent volumes
   - Credit card on file for billing

2. **GitHub Repository**
   - This code should be in a GitHub repository
   - Railway will deploy directly from GitHub

### Step 1: Create Railway Project

1. Log in to [Railway](https://railway.app)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Connect your GitHub account if needed
5. Select this repository
6. Railway will automatically detect it as a Node.js project

### Step 2: Add MySQL Database

1. In your Railway project, click **"+ New"**
2. Select **"Database" → "Add MySQL"**
3. Railway will provision a MySQL database
4. A `DATABASE_URL` environment variable will be automatically added

### Step 3: Add Persistent Volume

1. In your Railway project, click on your service (not the database)
2. Go to **"Settings" → "Volumes"**
3. Click **"+ New Volume"**
4. Set mount path: `/app/uploads`
5. Size: 5GB (or as needed for images)
6. Click **"Add"**

### Step 4: Configure Environment Variables

1. In your Railway service, go to **"Variables"** tab
2. Add the following variables:

```bash
# DATABASE_URL is auto-added by MySQL plugin

# JWT Secret (generate with: openssl rand -base64 32)
JWT_SECRET=<your-generated-secret-here>

# Node Environment
NODE_ENV=production

# Frontend URL (will be your Railway domain)
FRONTEND_URL=https://<your-project>.up.railway.app

# Port (Railway sets this automatically, but you can override)
PORT=3000
```

**To generate a secure JWT_SECRET:**
```bash
openssl rand -base64 32
```

### Step 5: Deploy

1. Railway will automatically trigger a deployment
2. Watch the build logs in the **"Deployments"** tab
3. Build process:
   - `pnpm install` (installs dependencies)
   - `pnpm build` (builds frontend + backend)
   - `pnpm start` (starts production server)
4. Wait for deployment to complete (usually 3-5 minutes)

### Step 6: Run Database Migrations

1. In Railway, go to your service
2. Click **"Settings" → "Deploy"**
3. Under **"Build Command"**, temporarily change to:
   ```
   pnpm install && pnpm build && pnpm db:push
   ```
4. Redeploy the service
5. After migration completes, change build command back to:
   ```
   pnpm install && pnpm build
   ```

**Alternative:** Use Railway CLI to run migrations:
```bash
railway run pnpm db:push
```

### Step 7: Seed Admin User

1. After migrations, you need to create the admin user
2. In Railway, open the **"Terminal"** for your service
3. Run:
   ```bash
   node seed-admin.mjs
   ```
4. This creates admin user:
   - **Username:** `matthewcottam`
   - **Password:** `Oakley123!`
   - **Email:** `info@adaptservicesgroup.co.uk`
   - **Role:** `admin`

### Step 8: Seed Blog Posts (Optional)

1. In Railway terminal, run:
   ```bash
   node seed-blog-posts-full.mjs
   ```
2. This populates the blog with sample content

### Step 9: Test Your Site

1. Railway provides a public URL: `https://<your-project>.up.railway.app`
2. Visit the site and test all pages:
   - Home page
   - Services, Sectors, About, Contact
   - Blog
   - Admin login at `/admin/login`
3. Log in with admin credentials
4. Test blog CRUD operations
5. Test image uploads

### Step 10: Configure Custom Domain

1. In Railway service, go to **"Settings" → "Domains"**
2. Click **"+ Custom Domain"**
3. Enter: `www.adaptservicesgroup.co.uk`
4. Railway will provide DNS instructions
5. **Coordinate with your DNS managers** (Cloudflare):
   - Add CNAME record: `www` → `<your-project>.up.railway.app`
   - Or use Railway's provided DNS settings
6. SSL certificate is automatically provisioned by Railway
7. Update `FRONTEND_URL` environment variable to:
   ```
   FRONTEND_URL=https://www.adaptservicesgroup.co.uk
   ```
8. Redeploy service

## 🔐 Authentication

### Admin Login

**Default Credentials:**
- **URL:** `/admin/login`
- **Username:** `matthewcottam`
- **Password:** `Oakley123!`

**Change Password (Recommended):**

After first login, change your password:

1. Connect to Railway database
2. Run:
   ```sql
   -- First, hash your new password with bcrypt (10 rounds)
   -- Then update:
   UPDATE users 
   SET password_hash = '<your-new-bcrypt-hash>' 
   WHERE username = 'matthewcottam';
   ```

**Or** add a password change feature to the admin dashboard.

## 📁 File Storage

### Upload Directory

- **Location:** `/app/uploads` (Railway persistent volume)
- **Access:** Files served at `/uploads/<filename>`
- **Max Size:** 50MB per file
- **Formats:** Images (PNG, JPG, WebP), PDFs, etc.

### Managing Uploaded Files

1. Via Railway CLI:
   ```bash
   railway run ls -la /app/uploads
   ```

2. Via admin dashboard:
   - Upload images when creating/editing blog posts
   - Images are stored in the volume
   - URLs are automatically generated

## 🗄️ Database Management

### Running Migrations

```bash
# Generate migration
pnpm db:push

# Or manually
npx drizzle-kit generate
npx drizzle-kit migrate
```

### Accessing Database

**Via Railway Dashboard:**
1. Go to MySQL service
2. Click **"Connect"**
3. Copy connection string or use web interface

**Via CLI:**
```bash
railway connect <mysql-service-id>
```

**Via Database Client:**
- Host, Port, User, Password from Railway's `DATABASE_URL`
- Use TablePlus, DBeaver, MySQL Workbench, etc.

### Backup Database

**Automated (Railway Pro):**
- Automatic daily backups
- Point-in-time recovery available

**Manual:**
```bash
railway run mysqldump -u <user> -p<password> -h <host> <database> > backup.sql
```

## 🛠️ Local Development

### Setup

1. **Clone repository:**
   ```bash
   git clone <your-repo-url>
   cd asg-website-railway
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up local database:**
   ```bash
   # Install MySQL locally, or use Docker:
   docker run -d \
     --name mysql \
     -p 3306:3306 \
     -e MYSQL_ROOT_PASSWORD=password \
     -e MYSQL_DATABASE=asg_website \
     mysql:8
   ```

4. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your local settings
   ```

5. **Run migrations:**
   ```bash
   pnpm db:push
   ```

6. **Seed admin user:**
   ```bash
   node seed-admin.mjs
   ```

7. **Start development server:**
   ```bash
   pnpm dev
   ```

8. **Open in browser:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000
   - Admin: http://localhost:5173/admin/login

### Development Commands

```bash
# Start dev server (frontend + backend)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run type checking
pnpm check

# Format code
pnpm format

# Run tests
pnpm test

# Database migrations
pnpm db:push
```

## 📝 Blog Management

### Creating Blog Posts

1. Log in to admin dashboard
2. Navigate to **"Blog"**
3. Click **"Create Post"**
4. Fill in:
   - Title
   - Slug (URL-friendly)
   - Excerpt (summary)
   - Content (Markdown supported)
   - Category (maintenance, case-study, emergency)
   - Featured image (upload or URL)
   - Meta description (SEO)
   - Status (draft, scheduled, published)

### Publishing Posts

- **Draft:** Saved but not public
- **Scheduled:** Set publish date in future
- **Published:** Immediately live

### Image Uploads

1. Click **"Upload Image"** in blog editor
2. Select file (max 50MB)
3. Image is uploaded to `/uploads`
4. URL is automatically inserted

## 🔧 Troubleshooting

### Build Fails

**Check Railway logs:**
1. Go to **"Deployments" → Select deployment → "Logs"**
2. Look for errors

**Common issues:**
- Missing dependencies: Run `pnpm install` locally first
- TypeScript errors: Run `pnpm check` locally
- Out of memory: Increase Railway plan limits

### Database Connection Fails

1. Verify `DATABASE_URL` environment variable is set
2. Check MySQL service is running in Railway
3. Ensure migrations have been run (`pnpm db:push`)

### Login Not Working

1. Verify admin user was seeded (`node seed-admin.mjs`)
2. Check `JWT_SECRET` environment variable is set
3. Clear browser cookies and try again
4. Check browser console for errors

### File Uploads Failing

1. Verify persistent volume is mounted at `/app/uploads`
2. Check volume has sufficient space
3. Verify file size is under 50MB
4. Check file permissions in Railway

### Site Slow/Unresponsive

1. Check Railway metrics (CPU, Memory, Network)
2. Upgrade Railway plan if needed
3. Enable Cloudflare CDN for static assets
4. Optimize images before uploading

## 🚨 Support

### Getting Help

1. **Railway Documentation:** https://docs.railway.app
2. **Railway Discord:** https://discord.gg/railway
3. **GitHub Issues:** Create issue in your repository

### Monitoring

**Railway provides:**
- Real-time logs
- Metrics (CPU, Memory, Network)
- Uptime monitoring
- Deployment history

**Recommended:**
- Set up Cloudflare for DDoS protection
- Use Sentry for error tracking
- Add Google Analytics for traffic monitoring

## 📊 Costs

**Railway Pro Plan:** $20/month
- Unlimited execution hours
- Persistent volumes included
- MySQL database included
- Team collaboration

**Persistent Volume:** ~$1.25/month for 5GB

**Total:** ~$21-22/month

## 🔒 Security

### Best Practices

1. **Change default admin password immediately**
2. **Use strong JWT_SECRET** (32+ characters)
3. **Enable Cloudflare proxy** for DDoS protection
4. **Keep dependencies updated:** `pnpm update`
5. **Regular database backups**
6. **Monitor Railway logs** for suspicious activity
7. **Use HTTPS only** (enforced by Railway + Cloudflare)

### Security Headers

- ✅ Helmet.js configured
- ✅ CORS properly set
- ✅ CSP (Content Security Policy)
- ✅ XSS protection
- ✅ CSRF protection via cookie settings

## 📈 Scaling

### Vertical Scaling

1. In Railway, go to **"Settings" → "Resources"**
2. Increase CPU/Memory allocation
3. Plans available up to 32GB RAM

### Horizontal Scaling

- Railway Pro supports multiple instances
- Load balancer automatically configured
- Session persistence via database-backed sessions

### Performance Optimization

1. **Enable Cloudflare CDN** for static assets
2. **Optimize images** before upload (WebP format)
3. **Database indexing** (already configured)
4. **Implement caching** (Redis optional add-on)

## 🎨 Customization

### Changing Content

- **Pages:** Edit in `client/src/pages/`
- **Components:** Edit in `client/src/components/`
- **Styles:** Edit TailwindCSS classes or `client/src/index.css`
- **Branding:** See `DESIGN_SYSTEM.md` and `BLOG_BRAND_VOICE.md`

### Adding Features

1. **Contact Forms:** Already implemented
2. **Newsletter:** Add email service integration
3. **Search:** Add Algolia or custom search
4. **Analytics:** Add Google Analytics script
5. **Chat:** Add Intercom or custom chat widget

## 🌐 DNS Configuration (Cloudflare)

### Required DNS Records

Coordinate with your DNS managers to add:

```
Type: CNAME
Name: www
Target: <your-railway-domain>.up.railway.app
Proxy: ON (orange cloud)
TTL: Auto
```

**Optional (root domain):**
```
Type: CNAME
Name: @ (or adaptservicesgroup.co.uk)
Target: <your-railway-domain>.up.railway.app
Proxy: ON
```

### Cloudflare Settings

1. **SSL/TLS Mode:** Full (strict)
2. **Always Use HTTPS:** ON
3. **Automatic HTTPS Rewrites:** ON
4. **Caching Level:** Standard
5. **Browser Cache TTL:** 4 hours

## 📞 Contact

**Website:** www.adaptservicesgroup.co.uk  
**Email:** info@adaptservicesgroup.co.uk  
**Admin Dashboard:** /admin/login

---

## 🎉 Success!

Your ASG website is now successfully deployed on Railway! 🚀

**Next Steps:**
1. ✅ Test all pages and functionality
2. ✅ Change admin password
3. ✅ Upload blog images
4. ✅ Customize content as needed
5. ✅ Set up monitoring and analytics
6. ✅ Configure Cloudflare DNS
7. ✅ Go live!

**Questions?** Check the troubleshooting section or contact Railway support.

---

**Deployed with ❤️ using Railway**
