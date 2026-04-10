<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExperienceResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'company_name' => $this->company_name,
            'role' => $this->role,
            'employment_type' => $this->employment_type,
            'location' => $this->location,
            'start_date' => $this->start_date?->toDateString(),
            'end_date' => $this->end_date?->toDateString(),
            'is_current' => (bool) $this->is_current,
            'summary' => $this->summary,
            'technologies_used' => $this->technologies_used ?? [],
            'achievements' => $this->achievements ?? [],
            'sort_order' => $this->sort_order,
            'job_descriptions' => JobDescriptionResource::collection(
                $this->whenLoaded('jobDescriptions'),
            ),
        ];
    }
}
