<?php

declare(strict_types=1);

namespace App\Models;

use App\Services\Blog\DataObjects\CategoryData;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\AsCollection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Spatie\LaravelData\WithData;

/**
 * App\Models\Category
 *
 * @property int $id
 * @property string $name
 * @property string $description
 * @property string $slug
 * @property string|null $category_image
 * @property string|null $category_thumb
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $headline
 * @property Collection $category_links
 * @property-read Library|null $images
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Post> $posts
 * @property-read int|null $posts_count
 *
 * @method static Builder|Category newModelQuery()
 * @method static Builder|Category newQuery()
 * @method static Builder|Category ofData()
 * @method static Builder|Category query()
 * @method static Builder|Category whereCategoryImage($value)
 * @method static Builder|Category whereCategoryThumb($value)
 * @method static Builder|Category whereCreatedAt($value)
 * @method static Builder|Category whereDescription($value)
 * @method static Builder|Category whereHeadline($value)
 * @method static Builder|Category whereId($value)
 * @method static Builder|Category whereName($value)
 * @method static Builder|Category whereSlug($value)
 * @method static Builder|Category whereUpdatedAt($value)
 */
final class Category extends Model
{
    use HasFactory;
    use WithData;

    protected $fillable = [
        'name',
        'description',
        'slug',
        'category_image',
        'category_thumb',
        'posts',
        'headline',
        'category_links',
    ];

    protected string $dataClass = CategoryData::class;

    protected $casts = [
        'category_links' => AsCollection::class,
    ];

    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }

    public function images(): MorphOne
    {
        return $this->morphOne(Library::class, 'imageable');
    }

    public function pages(): MorphToMany
    {
        return $this->morphToMany(Page::class, 'paggable', 'paggables');
    }

    public function scopeOfData(): Collection
    {
        return $this->all()
            ->map(
                fn ($category) => CategoryData::fromData($category)
            )
        ;
    }

    public function scopeOfNext(Builder $query, int $id): ?array
    {
        $next = $query->where('id', '>', $id)->first([
            'name', 'slug',
        ]);
        if (null !== $next) {
            return [
                'name' => $next->name,
                'slug' => '/learn-crypto/' . $next->slug,
            ];
        }

        return null;
    }

    public function scopeOfPrev(Builder $query, int $id): ?array
    {
        $prev = $query->where('id', '<', $id)->orderBy('id', 'desc')
            ->first(['name', 'slug'])
        ;
        if (null !== $prev) {
            return [
                'name' => $prev->name,
                'slug' => '/learn-crypto/' . $prev->slug,
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

    /**
     * Retrieve the model for a bound value.
     *
     * @param  mixed  $value
     * @param  string|null  $field
     */
    public function resolveRouteBinding($value, $field = null): ?Model
    {
        return $this->where('slug', $value)->firstOrFail();
    }
}
