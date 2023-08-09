<?php

declare(strict_types=1);

namespace App\Services\Blog\ApiResource;

use App\Models\Post;
use App\Services\Blog\Enums\PostStatus;
use Carbon\CarbonImmutable;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Spatie\LaravelData\Attributes\DataCollectionOf;
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
        public string $title,
        public string $slug,
        public string $introduction,
        public string $content,
        public PostStatus $status,
        public int $category_id,
        public CarbonImmutable|string $created_at,
        public CarbonImmutable|string $updated_at,
        public string $image_name,
        public string $headline,
        public string $reading_time,
        public Collection $post_links,
        public Optional|Lazy|CategoryApiResource $category,
        #[DataCollectionOf(TagsApiResource::class)]
        public Optional|Lazy|DataCollection $tags
    ) {
    }

    public static function fromModel(Post $post): self
    {
        return new self(
            id: $post->id,
            title: $post->title,
            slug: $post->slug,
            introduction: $post->introduction,
            content: $post->content,
            status: PostStatus::tryFrom($post->status),
            category_id: $post->category_id,
            created_at: CarbonImmutable::create($post->created_at)->isoFormat('lll'),
            updated_at: CarbonImmutable::create($post->updated_at)->isoFormat('lll'),
            image_name: $post->image_name,
            headline: $post->headline,
            reading_time: Str::readDuration($post->content) . ' min read',
            post_links: $post->post_links,
            category: Lazy::whenLoaded(
                'category',
                $post,
                static fn () => CategoryApiResource::from($post->category)
            ),
            tags: Lazy::whenLoaded(
                'tags',
                $post,
                static fn () => TagsApiResource::collection($post->tags)
            )
        );
    }

    public function with(): array
    {
        $query = Post::query()->whereNot(
            'slug',
            $this->slug
        )
            ->where('category_id', $this->category_id)
            ->inRandomOrder()->take(4)->get()
        ;

        return [
            'related' => $query,
        ];
    }
}
