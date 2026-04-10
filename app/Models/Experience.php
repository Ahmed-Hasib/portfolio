<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Experience extends Model
{
    /**
     * @var list<string>
     */
    protected $fillable = [
        'profile_id',
        'company_name',
        'role',
        'employment_type',
        'location',
        'start_date',
        'end_date',
        'is_current',
        'summary',
        'technologies_used',
        'achievements',
        'sort_order',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
            'is_current' => 'boolean',
            'technologies_used' => 'array',
            'achievements' => 'array',
        ];
    }

    public function profile(): BelongsTo
    {
        return $this->belongsTo(Profile::class);
    }

    public function jobDescriptions(): HasMany
    {
        return $this->hasMany(JobDescription::class);
    }
}
