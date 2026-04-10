<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SocialLinkResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'platform_name' => $this->platform_name,
            'icon' => $this->icon,
            'url' => $this->url,
            'display_order' => $this->display_order,
        ];
    }
}
