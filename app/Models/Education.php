<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Education extends Model
{
    protected $table = 'educations';

    /**
     * @var list<string>
     */
    protected $fillable = [
        'profile_id',
        'institute',
        'degree',
        'field',
        'start_year',
        'end_year',
        'grade',
        'summary',
        'sort_order',
    ];

    public function profile(): BelongsTo
    {
        return $this->belongsTo(Profile::class);
    }
}
