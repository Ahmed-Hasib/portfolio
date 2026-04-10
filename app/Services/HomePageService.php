<?php

namespace App\Services;

use App\Models\Profile;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class HomePageService
{
    public function __construct(
        private readonly ProfileService $profileService,
    ) {
    }

    /**
     * @return array{seo: array<string, string>, structuredData: array<string, mixed>}
     */
    public function buildPageData(): array
    {
        $profile = $this->profileService->findPublicProfile();
        $socialLinks = $this->profileService->getSocialLinks();
        $siteName = config('portfolio.seo.site_name');
        $title = $this->resolveTitle($profile);
        $description = $this->resolveDescription($profile);
        $image = $this->toAbsoluteUrl(
            $profile?->profile_image ?: config('portfolio.seo.default_image'),
        );
        $canonicalUrl = route('home');

        return [
            'seo' => [
                'title' => $title,
                'description' => $description,
                'canonical_url' => $canonicalUrl,
                'site_name' => $siteName,
                'image' => $image,
                'twitter_site' => config('portfolio.seo.twitter_site'),
                'author' => config('portfolio.seo.author'),
            ],
            'structuredData' => $this->buildStructuredData(
                $profile,
                $socialLinks,
                $title,
                $description,
                $image,
                $canonicalUrl,
                $siteName,
            ),
        ];
    }

    private function resolveTitle(?Profile $profile): string
    {
        if ($profile === null) {
            return config('portfolio.seo.default_title');
        }

        $designation = $profile->designation ?: config('portfolio.seo.site_name');

        return "{$profile->full_name} | {$designation}";
    }

    private function resolveDescription(?Profile $profile): string
    {
        if ($profile === null || blank($profile->bio)) {
            return config('portfolio.seo.default_description');
        }

        return Str::limit($profile->bio, 155, '');
    }

    /**
     * @param  Collection<int, mixed>  $socialLinks
     * @return array<string, mixed>
     */
    private function buildStructuredData(
        ?Profile $profile,
        Collection $socialLinks,
        string $title,
        string $description,
        string $image,
        string $canonicalUrl,
        string $siteName,
    ): array {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'Person',
            'name' => $profile?->full_name ?: $siteName,
            'jobTitle' => $profile?->designation ?: 'Full-Stack Developer',
            'description' => $description,
            'url' => $canonicalUrl,
            'image' => $image,
            'email' => $profile?->email,
            'telephone' => $profile?->phone,
            'address' => $profile?->location,
            'sameAs' => $socialLinks
                ->pluck('url')
                ->filter(fn (mixed $url) => is_string($url) && str_starts_with($url, 'http'))
                ->values()
                ->all(),
            'mainEntityOfPage' => [
                '@type' => 'WebPage',
                '@id' => $canonicalUrl,
                'name' => $title,
            ],
        ];
    }

    private function toAbsoluteUrl(?string $path): string
    {
        if (blank($path)) {
            return asset('favicon.ico');
        }

        if (Str::startsWith($path, ['http://', 'https://'])) {
            return $path;
        }

        return asset(ltrim($path, '/'));
    }
}
