<?php

declare(strict_types=1);

namespace App\Services\Blog\DataObjects;

use App\Models\Tag;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\LaravelData\Lazy;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript('TagsData')]
final class TagsData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        #[DataCollectionOf(PostData::class)]
        public Lazy|DataCollection $posts
    ) {
    }

    public static function fromModel(Tag $tag): self
    {
        return new self(
            $tag->id,
            $tag->name,
            Lazy::whenLoaded(
                'posts',
                $tag,
                fn () => PostData::collection($tag->posts)
            ),
        );
    }

    public static function allowedRequestIncludes(): ?array
    {
        return null;
    }
    // public static function make(Tag $tag)
    // {
    //     return new Collection(
    //         items: [
    //             'name' => $tag->name,
    //             'posts' => $tag->posts->map(fn ($post) => PostData::make($post)),
    //         ]
    //     );
    // }
}
