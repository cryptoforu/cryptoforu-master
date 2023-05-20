<?php

declare(strict_types=1);

namespace App\Services\Library\DataObjects;

use App\Models\LibraryCategory;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\LaravelData\Lazy;
use Spatie\LaravelData\Optional;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript('LibraryCategory')]
class LibraryCategoryData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public string $directory,
        #[DataCollectionOf(LibraryData::class)]
        public Optional|Lazy|DataCollection $media,
    ) {
    }

    public static function fromModel(LibraryCategory $libraryCategory): self
    {
        return new self(
            id: $libraryCategory->id,
            name: $libraryCategory->name,
            directory: $libraryCategory->directory,
            media: Lazy::whenLoaded('media', $libraryCategory, fn () => LibraryData::collection($libraryCategory->media))
        );
    }
}
