<?php

declare(strict_types=1);

namespace App\Services\Blog\DataObjects;

use App\Enums\ColorScheme;
use App\Models\Category;
use Illuminate\Support\Arr;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\LaravelData\Lazy;
use Spatie\LaravelData\Optional;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript('CategoryData')]
final class CategoryData extends Data
{
  public function __construct(
    public int $id,
    public string $name,
    public Optional|Lazy|string $slug,
    public Optional|Lazy|string $description,
    public Optional|Lazy|string $category_image,
    public Optional|Lazy|string $category_thumb,
    public Optional|Lazy|string $headline,
    #[DataCollectionOf(PostData::class)]
    public Optional|Lazy|DataCollection $posts,
  ) {
  }

  public static function fromModel(Category $category): self
  {
    return new self(
      $category->id,
      $category->name,
      $category->slug,
      Lazy::create(fn() => $category->description),
      Lazy::create(fn() => $category->category_image),
      Lazy::create(fn() => $category->category_thumb),
      Lazy::create(fn() => $category->headline),
      Lazy::whenLoaded(
        'posts',
        $category,
        fn() => PostData::collection($category->posts)
      ),
    );
  }

  public static function allowedRequestIncludes(): ?array
  {
    return null;
  }

  public static function fromData(Category $category): self
  {
    return new self(
      $category->id,
      $category->name,
      $category->slug,
      $category->description,
      $category->category_image,
      Lazy::create(fn() => $category->category_thumb),
      Lazy::create(fn() => $category->headline),
      Lazy::whenLoaded(
        'posts',
        $category,
        fn() => PostData::collection($category->posts)
      ),
    );
  }

  public static function schema(
    ?Category $category = null,
    string $type = 'empty'
  ): array {
    return match ($type) {
      'empty' => Arr::except(
        self::empty([
          'name' => '',
          'description' => '',
          'category_image' => '',
        ]),
        [
          'id', 'slug', 'category_thumb', 'posts', 'next', 'prev', 'headline',
          'links',
        ]
      ),
      'fields' => Arr::except(
        self::empty([
          'name' => 'textfield',
          'description' => 'textarea',
          'category_image' => 'file',
        ]),
        [
          'id', 'slug', 'category_thumb', 'posts', 'next', 'prev', 'headline',
          'links',
        ]
      ),
      'edit' => Arr::except(
        self::empty([
          'name' => $category->name,
          'description' => $category->description,
          'category_image' => null,
        ]),
        [
          'id', 'slug', 'category_thumb', 'posts', 'next', 'prev', 'headline',
          'links',
        ]
      ),
      default => [],
    };
  }

  public function with(): array
  {
    if (!request()->is('api/*')) {
      return [
        'endpoints' => [
          'delete' => route(
            'admin:blog:category.destroy',
            ['category' => (string) $this->slug]
          ),
        ],
      ];
    }

    return [
      'color' => ColorScheme::randColor(),
    ];
  }
}
