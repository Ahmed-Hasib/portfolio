<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Project extends Model
{
    /**
     * @var list<string>
     */
    protected $fillable = [
        'profile_id',
        'title',
        'slug',
        'thumbnail',
        'description',
        'category',
        'role',
        'full_description',
        'tech_stack',
        'live_url',
        'github_url',
        'featured',
        'sort_order',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'tech_stack' => 'array',
            'featured' => 'boolean',
        ];
    }

    public function profile(): BelongsTo
    {
        return $this->belongsTo(Profile::class);
    }
}
