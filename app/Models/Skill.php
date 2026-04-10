<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Skill extends Model
{
    /**
     * @var list<string>
     */
    protected $fillable = [
        'profile_id',
        'name',
        'category',
        'icon',
        'proficiency_percentage',
        'sort_order',
    ];

    public function profile(): BelongsTo
    {
        return $this->belongsTo(Profile::class);
    }
}
