<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfileResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'full_name' => $this->full_name,
            'designation' => $this->designation,
            'bio' => $this->bio,
            'location' => $this->location,
            'email' => $this->email,
            'phone' => $this->phone,
            'profile_image' => $this->profile_image,
            'resume_url' => $this->resume_url,
            'is_active' => (bool) $this->is_active,
            'skills' => SkillResource::collection($this->whenLoaded('skills')),
            'experiences' => ExperienceResource::collection(
                $this->whenLoaded('experiences'),
            ),
            'educations' => EducationResource::collection(
                $this->whenLoaded('educations'),
            ),
            'projects' => ProjectResource::collection($this->whenLoaded('projects')),
            'galleries' => GalleryResource::collection(
                $this->whenLoaded('galleries'),
            ),
            'social_links' => SocialLinkResource::collection(
                $this->whenLoaded('socialLinks'),
            ),
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }
}
