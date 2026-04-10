<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EducationResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'institute' => $this->institute,
            'degree' => $this->degree,
            'field' => $this->field,
            'start_year' => $this->start_year,
            'end_year' => $this->end_year,
            'grade' => $this->grade,
            'summary' => $this->summary,
            'sort_order' => $this->sort_order,
        ];
    }
}
