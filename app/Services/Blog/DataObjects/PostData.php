<?php

declare(strict_types=1);

namespace App\Services\Blog\DataObjects;

use App\Enums\ColorScheme;
use App\Models\Post;
use App\Services\Blog\Enums\PostStatus;
use Carbon\CarbonImmutable;
use DateTime;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Attributes\WithTransformer;
use Spatie\LaravelData\Casts\DateTimeInterfaceCast;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\LaravelData\Lazy;
use Spatie\LaravelData\Optional;
use Spatie\LaravelData\Transformers\DateTimeInterfaceTransformer;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript('PostData')]
final class PostData extends Data
{
  public function __construct(
    public int $id,
    public string $title,
    public Optional|string $slug,
    public Optional|Lazy|string $introduction,
    public Optional|Lazy|string $content,
    public Optional|Lazy|string $featured_image,
    public Optional|Lazy|string $thumb,
    public Optional|Lazy|PostStatus $status,
    public Optional|Lazy|int $category_id,
    #[WithCast(DateTimeInterfaceCast::class)]
    #[WithTransformer(DateTimeInterfaceTransformer::class)]
    public Optional|Lazy|DateTime $created_at,
    public Optional|Lazy|CarbonImmutable $updated_at,
    public Optional|Lazy|string $image_name,
    public Optional|Lazy|string $excerpt,
    #[DataCollectionOf(CategoryData::class)]
    public Optional|Lazy|CategoryData $category,
    #[DataCollectionOf(TagsData::class)]
    public Optional|Lazy|DataCollection $tags
  ) {
  }

  public static function fromModel(Post $post): self
  {
    return new self(
      $post->id,
      $post->title,
      $post->slug,
      Lazy::create(fn() => $post->introduction),
      Lazy::create(fn() => $post->content),
      Lazy::create(fn() => $post->featured_image),
      Lazy::create(fn() => $post->thumb),
      Lazy::create(fn() => $post->status),
      Lazy::create(fn() => $post->category_id),
      Lazy::create(fn() => $post->created_at),
      Lazy::create(fn() => $post->updated_at),
      Lazy::create(fn() => $post->image_name),
      Lazy::create(fn() => $post->excerpt),
      Lazy::whenLoaded('category', $post,
        fn() => CategoryData::from($post->category)),
      Lazy::whenLoaded('tags', $post,
        fn() => TagsData::collection($post->tags)),
    );
  }

  public static function authorize(): bool
  {
    return auth()->check();
  }

  public static function schema(string $type = 'empty'): array
  {
    $schema = self::empty([
      'title' => 'empty' === $type ? '' : 'textfield',
      'introduction' => 'empty' === $type ? '' : 'textarea',
      'content' => 'empty' === $type ? '' : 'md',
      'featured_image' => 'empty' === $type ? null : 'file',
      'status' => 'empty' === $type ? 'DRAFT' : 'select',
      'category_id' => 'empty' === $type ? 0 : 'select',
      'tags' => 'empty' === $type ? [] : 'tags',
    ]);

    return Arr::except($schema, [
      'id', 'slug', 'thumb', 'created_at', 'updated_at', 'image_name',
      'excerpt', 'category'
    ]);
  }

  public static function editSchema(Post $post, string $type = 'initial'): array
  {
    $schema = self::empty([
      'title' => 'initial' === $type ? $post->title : 'textfield',
      'introduction' => 'initial' === $type ? $post->introduction : 'textarea',
      'content' => 'initial' === $type ? $post->content : 'md',
      'featured_image' => 'initial' === $type ? null : 'file',
      'status' => 'initial' === $type ? $post->status : 'select',
      'category_id' => 'initial' === $type ? $post->category_id : 'select',
      'tags' => 'initial' === $type ? self::filterTags($post->tags) : 'tags',
    ]);

    return Arr::except($schema, [
      'id', 'slug', 'thumb', 'created_at', 'updated_at', 'image_name',
      'excerpt', 'category'
    ]);
  }

  public static function filterTags(Collection $tags)
  {
    return $tags->map(fn($tag) => $tag->id);
  }

  public static function fromData(Post $post): PostData
  {
    return new self(
      $post->id,
      $post->title,
      $post->slug,
      $post->introduction,
      Optional::create(),
      Optional::create(),
      Optional::create(),
      $post->status,
      Optional::create(),
      Optional::create(),
      Optional::create(),
      $post->image_name,
      Optional::create(),
      Lazy::whenLoaded('category', $post,
        fn() => CategoryData::from($post->category)),
      Lazy::whenLoaded('tags', $post,
        fn() => TagsData::collection($post->tags)),
    );
  }

  public function with(): array
  {
    return [
      'color' => ColorScheme::randColor(),
    ];
  }
}
