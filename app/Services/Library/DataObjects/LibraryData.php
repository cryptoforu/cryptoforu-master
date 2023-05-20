<?php

declare(strict_types=1);

namespace App\Services\Library\DataObjects;

use App\Models\Library;
use Illuminate\Database\Eloquent\Model;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;
use Spatie\LaravelData\Optional;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript('LibraryData')]
class LibraryData extends Data
{
    public function __construct(
        public int $id,
        public string $file_name,
        public Optional|Lazy|string $mime_type,
        public Optional|Lazy|array $conversions,
        public Optional|Lazy|string $size,
        public Optional|Lazy|int $width,
        public Optional|Lazy|int $height,
        public Optional|Lazy|string $image_url,
        public Optional|Lazy|int $imageable_id,
        public Optional|Lazy|int $library_category_id,
        public Optional|Lazy|string $imageable_type,
        public Optional|Lazy|Model $imageable,
        #[DataCollectionOf(LibraryCategoryData::class)]
        public Optional|Lazy|LibraryCategoryData $libraryCategory,
    ) {
    }

    public static function fromModel(Library $library): self
    {
        return new self(
            id: $library->id,
            file_name: $library->file_name,
            mime_type: Lazy::create(fn () => $library->mime_type),
            conversions: Lazy::create(fn () => $library->conversions),
            size: Lazy::create(fn () => $library->size),
            width: Lazy::create(fn () => $library->width),
            height: Lazy::create(fn () => $library->height),
            image_url: Lazy::create(fn () => $library->image_url),
            imageable_id: Lazy::create(fn () => $library->imageable_id),
            library_category_id: Lazy::create(fn () => $library->library_category_id),
            imageable_type: Lazy::create(fn () => $library->imageable_type),
            imageable: Lazy::create(fn () => $library->imageable),
            libraryCategory: Lazy::whenLoaded('libraryCategory', $library, fn () => LibraryCategoryData::from($library->libraryCategory))
        );
    }
}
