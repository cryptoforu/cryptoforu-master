<?php

declare(strict_types=1);

namespace App\Services\Blog\ApiResource;

use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\LaravelData\Lazy;
use Spatie\LaravelData\Optional;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript('TagsApiResource')]
final class TagsApiResource extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        #[DataCollectionOf(PostApiResource::class)]
        public Lazy|Optional|DataCollection $posts
    ) {
    }
}
