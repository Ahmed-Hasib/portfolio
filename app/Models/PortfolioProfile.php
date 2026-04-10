<?php

namespace App\Models;

use Database\Factories\PortfolioProfileFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PortfolioProfile extends Model
{
    /** @use HasFactory<PortfolioProfileFactory> */
    use HasFactory;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'full_name',
        'headline',
        'short_bio',
        'location',
        'email',
        'availability',
        'cv_url',
        'social_links',
        'highlight_metrics',
        'is_active',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'social_links' => 'array',
            'highlight_metrics' => 'array',
            'is_active' => 'boolean',
        ];
    }
}
