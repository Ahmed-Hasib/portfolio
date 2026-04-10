# Hasib Portfolio v2

Laravel 12 + React 19 portfolio foundation running in a single project with Vite, Tailwind CSS 4, and Framer Motion.

## Requirements

- PHP 8.2+
- Composer 2+
- Node.js 22+
- MySQL 8+

## Local setup

```bash
cp .env.example .env
composer install
npm install
php artisan key:generate
php artisan migrate
composer dev
```

Update the database values in `.env` before running migrations.

## Available scripts

```bash
composer dev
php artisan test
npm run build
npm run lint
npm run format
```
