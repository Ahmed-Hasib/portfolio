<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PortfolioProfileResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'full_name' => $this->full_name,
            'headline' => $this->headline,
            'short_bio' => $this->short_bio,
            'location' => $this->location,
            'email' => $this->email,
            'availability' => $this->availability,
            'cv_url' => $this->cv_url,
            'social_links' => $this->social_links ?? [],
            'highlight_metrics' => $this->highlight_metrics ?? [],
            'is_active' => (bool) $this->is_active,
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }
}
