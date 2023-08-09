<?php

declare(strict_types=1);

namespace App\Services\Blog\ApiResource;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Support\Collection;
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
        static fn() => static::check_query('description'),
        static fn() => $category->description
      ),
      category_image: Lazy::when(
        static fn() => static::check_query('category_image'),
        static fn() => $category->category_image
      ),
      category_thumb: Optional::create(),
      headline: Lazy::when(
        static fn() => static::check_query('headline'),
        static fn() => $category->headline
      ),
      category_links: Lazy::when(
        static fn() => static::check_query('category_links'),
        static fn() => $category->category_links
      ),
      posts: Lazy::whenLoaded('posts', $category, static fn(
      ) => PostApiResource::collection($category->posts()->latest()->jsonPaginate()->appends(Request::query())))
    );

  }

  public static function check_query(string $key): bool
  {
    Request::whenHas(
      'fields',
      static fn() => Request::string('fields[categories]')->contains($key)
    );

    return true;
  }

  public function with(): array
  {
    $query = Post::query()->where(
      'category_id',
      $this->id
    )->inRandomOrder()->take(4)->get();

    return [
      'related' => $query,
    ];
  }
}
