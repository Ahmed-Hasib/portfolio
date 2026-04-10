<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Gallery extends Model
{
    /**
     * @var list<string>
     */
    protected $fillable = [
        'profile_id',
        'title',
        'description',
        'image',
        'category',
        'sort_order',
    ];

    public function profile(): BelongsTo
    {
        return $this->belongsTo(Profile::class);
    }
}
