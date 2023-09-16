<?php

declare(strict_types=1);

namespace App\Services\Library\DataObjects;

use Spatie\LaravelData\Data;

final class FileObject extends Data
{
    public function __construct(
        public string $file_name,
        public string $mime_type,
        public array $conversions,
        public int $size,
        public int $width,
        public int $height,
        public string $image_url,
    ) {
    }
}
