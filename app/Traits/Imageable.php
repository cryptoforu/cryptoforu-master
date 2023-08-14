<?php

declare(strict_types=1);

namespace App\Traits;

use App\Interfaces\Library\LibraryActionsInterface;
use App\Models\Library;

trait Imageable
{
    public function __construct(
        private readonly LibraryActionsInterface $library,
    ) {
    }

    public function check_image(mixed $img, string $directory): ?array
    {
        if (null === $img) {
            return null;
        }
        if (is_string($img)) {
            return Library::query()
                ->where(
                    'file_name',
                    $img
                )
                ->first()
                ->toArray()
            ;

        }

        return $this->library->store(
            file: $img,
            directory: $directory
        );

    }
}
