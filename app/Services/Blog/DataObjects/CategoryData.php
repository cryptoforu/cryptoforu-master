<?php

declare(strict_types=1);

namespace App\Services\Blog\DataObjects;

use App\Models\Category;
use Illuminate\Support\Arr;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\LaravelData\Lazy;
use Spatie\LaravelData\Optional;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript('CategoryData')]
class CategoryData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public Optional|Lazy|string $slug,
        public Optional|Lazy|string $description,
        public Optional|Lazy|string $category_image,
        public Optional|Lazy|string $category_thumb,
        #[DataCollectionOf(PostData::class)]
        public Lazy|DataCollection $posts,
    ) {
    }

    public static function fromModel(Category $category): self
    {
        return new self(
            $category->id,
            $category->name,
            Lazy::create(fn () => $category->slug),
            Lazy::create(fn () => $category->description),
            Lazy::create(fn () => $category->category_image),
            Lazy::create(fn () => $category->category_thumb),
            Lazy::whenLoaded('posts', $category, fn () => PostData::collection($category->posts)),
        );
    }

    public static function schema(Category $category = null, string $type = 'empty'): array
    {
        switch ($type) {
            case 'empty':
                return Arr::except(
                    self::empty([
                        'name' => '',
                        'description' => '',
                        'category_image' => '',
                    ]),
                    [
                        'id', 'slug', 'category_thumb', 'posts',
                    ]
                );
                break;
            case 'fields':
                return Arr::except(
                    self::empty([
                        'name' => 'textfield',
                        'description' => 'textarea',
                        'category_image' => 'file',
                    ]),
                    [
                        'id', 'slug', 'category_thumb', 'posts',
                    ]
                );
                break;
            case 'edit':
                return Arr::except(
                    self::empty([
                        'name' => $category->name,
                        'description' => $category->description,
                        'category_image' => $category->category_image,
                    ]),
                    [
                        'id', 'slug', 'category_thumb', 'posts',
                    ]
                );
                break;
        }
    }
}
