<?php

declare(strict_types=1);

namespace App\Services\Blog\ApiResource;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Request;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\LaravelData\Lazy;
use Spatie\LaravelData\Optional;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript('CategoryApiResource')]
class CategoryApiResource extends Data
{
    public function __construct(
      public int $id,
      public Lazy|string $name,
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
          name: Lazy::when(
            fn() => null !== $category->name,
            fn() => $category->name
          ),
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
            function () use ($category) {
                return Request::whenHas('page', function () use ($category) {
                    return PostApiResource::collection(
                      $category->posts()
                        ->latest()->jsonPaginate()
                        ->appends(Request::query())
                    );
                }, static fn() => PostApiResource::collection(
                  $category->posts()->get()
                ));
            }
          )
        );
    }

    public function with(): array
    {
        if ('categories' === Request::query('with', 0)) {
            return [
              'related' => Cache::tags([
                'blog',
                'categories',
              ])->rememberForever(
                key: 'related-'.$this->id,
                callback: function () {
                    return Post::query()->where(
                      'category_id',
                      $this->id
                    )->inRandomOrder()->take(4)->get();
                }
              ),
            ];
        }

        return [];
    }
}
