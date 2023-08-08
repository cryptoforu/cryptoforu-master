<?php

declare(strict_types=1);

namespace App\Models;

use App\Services\Blog\DataObjects\PostData;
use App\Services\Blog\Enums\PostStatus;
use CyrildeWit\EloquentViewable\Contracts\Viewable;
use CyrildeWit\EloquentViewable\InteractsWithViews;
use Database\Factories\PostFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\AsCollection;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Carbon;
use Laravel\Scout\Searchable;
use Spatie\Enum\Enum;
use Spatie\LaravelData\WithData;

/**
 * App\Models\Post
 *
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property string $introduction
 * @property string $content
 * @property string|null $featured_image
 * @property string|null $thumb
 * @property string $image_name
 * @property string $excerpt
 * @property int $is_published
 * @property int $category_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Enum|null $status
 * @property string|null $headline
 * @property \Illuminate\Support\Collection $post_links
 * @property Enum|null $nullable_enum
 * @property Enum[]|null $array_of_enums
 * @property Enum[]|null $nullable_array_of_enums
 * @property-read Category $category
 * @property-read Collection<int, Library> $images
 * @property-read int|null $images_count
 * @property-read Collection<int, Tag> $tags
 * @property-read int|null $tags_count
 *
 * @method static PostFactory factory($count = null, $state = [])
 * @method static Builder|Post featured()
 * @method static Builder|Post newModelQuery()
 * @method static Builder|Post newQuery()
 * @method static Builder|Post ofLatest(int $take)
 * @method static Builder|Post ofStatus(PostStatus $status)
 * @method static Builder|Post query()
 * @method static Builder|Post whereCategoryId($value)
 * @method static Builder|Post whereContent($value)
 * @method static Builder|Post whereCreatedAt($value)
 * @method static Builder|Post whereExcerpt($value)
 * @method static Builder|Post whereFeaturedImage($value)
 * @method static Builder|Post whereHeadline($value)
 * @method static Builder|Post whereId($value)
 * @method static Builder|Post whereImageName($value)
 * @method static Builder|Post whereIntroduction($value)
 * @method static Builder|Post whereIsPublished($value)
 * @method static Builder|Post whereSlug($value)
 * @method static Builder|Post whereStatus($value)
 * @method static Builder|Post whereThumb($value)
 * @method static Builder|Post whereTitle($value)
 * @method static Builder|Post whereUpdatedAt($value)
 */
final class Post extends Model implements Viewable
{
    use HasFactory;
    use InteractsWithViews;
    use Searchable;
    use WithData;

    protected $fillable = [
        'title',
        'content',
        'introduction',
        'slug',
        'featured_image',
        'thumb',
        'category_id',
        'image_name',
        'excerpt',
        'status',
        'headline',
        'post_links',

    ];

    protected $dataClass = PostData::class;

    protected $casts = [
        'status' => PostStatus::class,
        'nullable_enum' => PostStatus::class . ':nullable',
        'array_of_enums' => PostStatus::class . ':collection',
        'nullable_array_of_enums' => PostStatus::class . ':collection,nullable',
        'post_links' => AsCollection::class,

    ];

    protected $with = ['tags'];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class)->as('tags');
    }

    public function images(): MorphMany
    {
        return $this->morphMany(Library::class, 'imageable');
    }

    public function scopeOfStatus(Builder $query, PostStatus $status): Builder
    {
        return $query->where('status', $status);
    }

    public function scopeOfLatest(Builder $query, int $take): Builder
    {
        return $query->where(
            'status',
            'published'
        )->orWhere('status', 'featured')->take($take)->latest();
    }

    public function scopeFeatured(Builder $query): void
    {
        $query->where('status', PostStatus::FEATURED());
    }

    public function scopePublished(Builder $query): void
    {
        $query->where('status', PostStatus::PUBLISHED());
    }

    public function scopeOfNext(Builder $query, int $id): array|null
    {
        $next = $query->with('category')->where('id', '>', $id)->first([
            'title', 'slug', 'category_id',
        ]);
        if (null !== $next) {
            return [
                'name' => $next->title,
                'slug' => '/learn-crypto/' . $next->category->slug . '/' . $next->slug,
            ];
        }

        return null;
    }

    public function scopeOfPrev(Builder $query, int $id): array|null
    {
        $prev = $query->with('category')->where('id', '<', $id)->orderBy(
            'id',
            'desc'
        )
            ->first(['title', 'slug', 'category_id'])
        ;
        if (null !== $prev) {
            return [
                'name' => $prev->title,
                'slug' => '/learn-crypto/' . $prev->category->slug . '/' . $prev->slug,
            ];
        }

        return null;
    }

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function toSearchableArray(): array
    {
        return [
            'title' => $this->title,
        ];
    }
}
