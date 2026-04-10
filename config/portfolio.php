<?php

return [
    'seo' => [
        'site_name' => env('SEO_SITE_NAME', env('APP_NAME', 'Hasib Portfolio v2')),
        'default_title' => env('SEO_DEFAULT_TITLE', 'Hasib Portfolio v2'),
        'default_description' => env(
            'SEO_DESCRIPTION',
            'Modern portfolio website built with Laravel, React, Tailwind CSS, and Framer Motion.',
        ),
        'default_image' => env('SEO_IMAGE', '/og-default.svg'),
        'twitter_site' => env('SEO_TWITTER_SITE', '@hasib'),
        'author' => env('SEO_AUTHOR', 'Hasib Rahman'),
    ],
    'contact' => [
        'notification_email' => env('CONTACT_NOTIFICATION_EMAIL'),
        'notification_name' => env('CONTACT_NOTIFICATION_NAME'),
    ],
    'security' => [
        'force_https' => (bool) env('APP_FORCE_HTTPS', false),
        'hsts_max_age' => (int) env('SECURITY_HSTS_MAX_AGE', 31536000),
    ],
];
