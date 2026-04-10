<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AddSecurityHeaders
{
    /**
     * @param  Closure(Request): Response  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('X-Frame-Options', 'SAMEORIGIN');
        $response->headers->set(
            'Permissions-Policy',
            'camera=(), microphone=(), geolocation=()',
        );

        if ($request->isSecure() || config('portfolio.security.force_https')) {
            $response->headers->set(
                'Strict-Transport-Security',
                'max-age='.config('portfolio.security.hsts_max_age').'; includeSubDomains; preload',
            );
        }

        return $response;
    }
}
