<?php

declare(strict_types=1);

namespace App\Services\Blog\ApiResource;

use App\Models\Category;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Request;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\LaravelData\Lazy;
use Spatie\LaravelData\Optional;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript('CategoryApiResource')]
final class CategoryApiResource extends Data
{
  public function __construct(
    public int $id,
    public string $name,
    public string $slug,
    public Lazy|string $description,
    public Lazy|string $category_image,
    public Optional|Lazy|string $category_thumb,
    public Optional|Lazy|string $headline,
    public Optional|Lazy|Collection $category_links,
    #[DataCollectionOf(PostApiResource::class)]
    public Optional|Lazy|DataCollection $posts,
  ) {
  }

  public static function fromModel(Category $category): self
  {
    return new self(
      id: $category->id,
      name: $category->name,
      slug: $category->slug,
      description: Lazy::when(
        fn() => null !== $category->description,
        fn() => $category->description
      ),
      category_image: Lazy::when(
        fn() => null !== $category->category_image,
        fn() => $category->category_image
      ),
      category_thumb: Optional::create(),
      headline: Lazy::when(
        fn() => null !== $category->headline,
        fn() => $category->headline
      ),
      category_links: Lazy::when(
        fn() => null !== $category->category_links,
        fn() => $category->category_links
      ),
      posts: Lazy::whenLoaded(
        'posts',
        $category,
        fn() => PostApiResource::collection(
          $category->posts()
            ->latest()->fastJson()
            ->appends(Request::query())
        )
      )
    );
  }
}
