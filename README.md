# Hasib Portfolio v2

Laravel 12 + React 19 portfolio application running in a single codebase with Vite, Tailwind CSS 4, Framer Motion, MySQL, repository-pattern APIs, and database-driven portfolio content.

## Requirements

- PHP 8.2+
- Composer 2+
- Node.js 22+
- MySQL 8+

## Local setup

```bash
cp .env.example .env
composer setup
php artisan serve
npm run dev
```

`composer setup` installs dependencies, creates the app key, runs migrations, seeds demo portfolio content, creates the `public/storage` symlink, and builds frontend assets.

## Useful commands

```bash
composer dev
composer test
npm run lint
npm run build
npm run format
```

## SEO and contact configuration

Configure these values in `.env` or `.env.production`:

- `CONTACT_NOTIFICATION_EMAIL` to receive new contact submissions by email
- `SEO_SITE_NAME`, `SEO_DEFAULT_TITLE`, `SEO_DESCRIPTION`, `SEO_IMAGE`, `SEO_TWITTER_SITE`, and `SEO_AUTHOR` for metadata defaults
- `APP_FORCE_HTTPS=true` and `ASSET_URL=https://your-domain.com` for production

## Deployment

1. Set production values in `.env.production.example` or your real production `.env`.
2. Point the web root to Laravel `public/`.
3. Install PHP and Node dependencies on the server.
4. Run `composer deploy`.
5. Ensure the queue, mail, and storage permissions match your hosting setup.

`composer deploy` builds Vite assets, runs migrations, creates the storage symlink, clears stale caches, and caches Laravel config, routes, and compiled views for production.

## Production notes

- Keep `APP_DEBUG=false` in production.
- Use HTTPS and enable `APP_FORCE_HTTPS=true` behind a trusted proxy or load balancer.
- Store portfolio images in optimized formats such as WebP or AVIF before uploading.
- Run a real SMTP provider instead of the `log` mailer if contact email notifications are needed.
- All visible portfolio sections are already database-driven, so an admin panel can be added later without changing the public API shape.
