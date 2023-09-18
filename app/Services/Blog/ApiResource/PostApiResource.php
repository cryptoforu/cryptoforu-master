<?php

declare(strict_types=1);

namespace App\Services\Blog\ApiResource;

use App\Contracts\CountActionContract;
use App\Models\Post;
use App\Services\Blog\Casts\ReadingTime;
use App\Services\Blog\Enums\PostStatus;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Str;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Attributes\WithCastable;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\LaravelData\Lazy;
use Spatie\LaravelData\Optional;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript('PostApiResource')]
final class PostApiResource extends Data
{
  public function __construct(
    public int $id,
    public Lazy|string $title,
    public string $slug,
    public Lazy|string $introduction,
    public Lazy|string $content,
    public Lazy|PostStatus $status,
    public int $category_id,
    public Lazy|Carbon|string $created_at,
    public Lazy|Carbon|string $updated_at,
    public Lazy|string $image_name,
    public Lazy|string $headline,
    #[WithCastable(ReadingTime::class)]
    public Lazy|string $reading_time,
    public Lazy|Collection $post_links,
    public Optional|Lazy|CategoryApiResource $category,
    #[DataCollectionOf(TagsApiResource::class)]
    public Optional|Lazy|DataCollection $tags,
  ) {
  }


  public static function fromModel(Post $post): self
  {
    return new self(
      id: $post->id,
      title: Lazy::when(
        fn() => null !== $post->title,
        fn() => $post->title
      ),
      slug: $post->slug,
      introduction: Lazy::when(
        fn() => null !== $post->introduction,
        fn() => $post->introduction
      ),
      content: Lazy::when(
        fn() => null !== $post->content,
        fn() => $post->content
      ),
      status: Lazy::when(
        fn() => !is_null(PostStatus::tryFrom($post->status)),
        fn() => PostStatus::tryFrom($post->status)
      ),
      category_id: $post->category_id,
      created_at: Lazy::create(
        static fn() => Carbon::create(
          $post->created_at
        )->isoFormat('lll')
      ),
      updated_at: Lazy::when(
        fn() => null !== $post->updated_at,
        fn() => Carbon::create($post->updated_at)->isoFormat(
          'lll'
        )
      ),
      image_name: Lazy::when(
        fn() => null !== $post->image_name,
        fn() => $post->image_name
      ),
      headline: Lazy::when(
        fn() => null !== $post->headline,
        fn() => $post->headline
      ),
      reading_time: Lazy::when(
        fn() => null !== $post->content,
        fn() => Str::readDuration($post->content) . ' min read'
      ),
      post_links: Lazy::when(
        fn() => null !== $post->post_links,
        fn() => $post->post_links
      ),
      category: Lazy::whenLoaded(
        'category',
        $post,
        static fn() => CategoryApiResource::from($post->category)->only(
          'category' . Request::string('fields[categories]')->toString()
        )
      ),
      tags: Lazy::whenLoaded(
        'tags',
        $post,
        static fn() => TagsApiResource::collection($post->tags)
      )
    );
  }

  public function with(): array
  {
    $countContract = App::call(function (
      CountActionContract $actionContract
    ) {
      return $actionContract->get_count(
        uniqueKey: "post-$this->id"
      );
    });

    return [
      'count' => $countContract,
    ];
  }
}
