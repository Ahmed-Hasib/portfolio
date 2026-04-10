<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'thumbnail' => $this->thumbnail,
            'description' => $this->description,
            'full_description' => $this->full_description,
            'category' => $this->category,
            'role' => $this->role,
            'tech_stack' => $this->tech_stack ?? [],
            'live_url' => $this->live_url,
            'github_url' => $this->github_url,
            'featured' => (bool) $this->featured,
            'sort_order' => $this->sort_order,
        ];
    }
}
