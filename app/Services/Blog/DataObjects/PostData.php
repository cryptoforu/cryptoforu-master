<?php

declare(strict_types=1);

namespace App\Services\Blog\DataObjects;

use App\Models\Post;
use App\Services\Blog\Enums\PostStatus;
use Carbon\CarbonImmutable;
use DateTime;
use Illuminate\Support\Arr;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
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
        public Optional|Lazy|string $headline,
        public Optional|Lazy|string $reading_time,
        public Optional|lazy|string $category_name,
        #[DataCollectionOf(CategoryData::class)]
        public Optional|Lazy|CategoryData $category,
        #[DataCollectionOf(TagsData::class)]
        public Optional|Lazy|DataCollection $tags
    ) {
    }

    public static function fromData(Post $post): PostData
    {
        return new self(
            id: $post->id,
            title: $post->title,
            slug: $post->slug,
            introduction: $post->introduction,
            content: $post->content,
            featured_image: Optional::create(),
            thumb: Optional::create(),
            status: Lazy::create(static fn () => $post->status),
            category_id: $post->category_id,
            created_at: $post->created_at,
            updated_at: Lazy::create(static fn () => $post->updated_at),
            image_name: $post->image_name,
            excerpt: Optional::create(),
            headline: Optional::create(),
            reading_time: Optional::create(),
            category_name: $post->category->name,
            category: Lazy::whenLoaded(
                'category',
                $post,
                static fn () => CategoryData::from($post->category)
            ),
            tags: Lazy::whenLoaded(
                'tags',
                $post,
                static fn () => TagsData::collection($post->tags)
            )
        );
    }

    public static function fromModel(Post $post): self
    {
        return new self(
            $post->id,
            $post->title,
            $post->slug,
            Lazy::when(
                static fn () => request()->is('api/*'),
                static fn () => $post->introduction
            ),
            Lazy::when(
                static fn () => request()->is('api/*'),
                static fn () => $post->content
            ),
            Lazy::create(static fn () => $post->featured_image),
            Lazy::create(static fn () => $post->thumb),
            Lazy::when(
                static fn () => request()->is('api/*'),
                static fn () => $post->status
            ),
            Lazy::when(
                static fn () => request()->is('api/*'),
                static fn () => $post->category_id
            ),
            Lazy::create(static fn () => $post->created_at),
            Lazy::when(
                static fn () => request()->is('api/*'),
                static fn () => $post->updated_at
            ),
            Lazy::when(
                static fn () => request()->is('api/*'),
                static fn () => $post->image_name
            ),
            Lazy::create(static fn () => $post->excerpt),
            Lazy::when(
                static fn () => request()->is('api/*'),
                static fn () => $post->headline
            ),
            Lazy::when(
                static fn () => request()->is('api/*'),
                static fn () => Str::readDuration($post->content) . ' min read'
            ),
            Lazy::create(static fn () => $post->category->name),
            Lazy::whenLoaded(
                'category',
                $post,
                static fn () => CategoryData::from($post->category)
            ),
            Lazy::whenLoaded(
                'tags',
                $post,
                static fn () => TagsData::collection($post->tags)
            ),
        );
    }

    public static function allowedRequestIncludes(): ?array
    {
        return null;
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
            'excerpt', 'category', 'headline', 'post_link', 'reading_time',
            'category_name',
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
            'excerpt', 'category', 'headline', 'post_link', 'reading_time',
            'category_name',
        ]);
    }

    public static function filterTags(Collection $tags): Collection
    {
        return $tags->map(fn ($tag) => $tag->id);
    }

    public static function fromCollection(Collection $collection): Collection
    {
        return $collection->map(
            fn (Post $item) => PostData::make($item)
        );
    }

    public static function make(Post $post): Collection
    {
        return collect(
            value: [
                'title' => $post->title,
                'image_name' => $post->image_name,
                'introduction' => $post->introduction,
                'content' => $post->content,
                'created_at' => Carbon::parse($post->created_at)->toDateString(),
                'reading_time' => Str::readDuration($post->content) . ' min read',
                'category_name' => $post->category->name,
                'status' => $post->status,
                'slug' => $post->slug,
                'headline' => $post->headline,
                'tags' => $post->tags()->get(['name']),
            ]
        );
    }

    public function with(): array
    {

        if (request()->is('api/*')) {
            return [
                'color' => $this->status->tw_color(),

            ];
        }

        return [
            'statusValues' => PostStatus::cases(),
            'color' => PostStatus::tryFrom($this->status->value)->color(),
            'endpoints' => [
                'status' => route(
                    'admin:blog:status',
                    ['post' => $this->slug],
                    false
                ),
                'edit' => route(
                    'admin:blog:post.edit',
                    ['post' => $this->slug],
                    false
                ),
                'delete' => route(
                    'admin:blog:post.destroy',
                    ['post' => $this->slug],
                    false
                ),
            ],
        ];

    }
}
