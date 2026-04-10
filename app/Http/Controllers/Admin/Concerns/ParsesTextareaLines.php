<?php

namespace App\Http\Controllers\Admin\Concerns;

trait ParsesTextareaLines
{
    /**
     * @return list<string>
     */
    protected function parseLines(?string $value): array
    {
        if ($value === null || trim($value) === '') {
            return [];
        }

        $lines = preg_split('/\r\n|\r|\n/', $value) ?: [];

        return array_values(array_filter(array_map(
            static fn (string $line): string => trim($line),
            $lines,
        )));
    }
}
