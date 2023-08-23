<?php

declare(strict_types=1);

namespace App\Models;

use App\Services\Settings\Page\DataObjects\PageData;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Support\Carbon;
use Spatie\LaravelData\WithData;

/**
 * App\Models\Page
 *
 * @property int $id
 * @property string $label
 * @property string|null $route
 * @property string $meta_desc
 * @property string|null $meta_image
 * @property string|null $tw_image
 * @property string|null $og_image
 * @property int $parent_id
 * @property string $page_type
 * @property string $page_name
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Collection<int, Page> $childs
 * @property-read int|null $childs_count
 * @property-read Collection<int, Library> $images
 * @property-read int|null $images_count
 * @property-read Page|null $parents
 *
 * @method static Builder|Page newModelQuery()
 * @method static Builder|Page newQuery()
 * @method static Builder|Page ofName(string $page_name)
 * @method static Builder|Page ofType(string $page_type)
 * @method static Builder|Page page(string $page_type, string $page)
 * @method static Builder|Page parent()
 * @method static Builder|Page query()
 * @method static Builder|Page route(string $route, ?string $fallback = null)
 * @method static Builder|Page whereCreatedAt($value)
 * @method static Builder|Page whereId($value)
 * @method static Builder|Page whereLabel($value)
 * @method static Builder|Page whereMetaDesc($value)
 * @method static Builder|Page whereMetaImage($value)
 * @method static Builder|Page whereOgImage($value)
 * @method static Builder|Page wherePageName($value)
 * @method static Builder|Page wherePageType($value)
 * @method static Builder|Page whereParentId($value)
 * @method static Builder|Page whereRoute($value)
 * @method static Builder|Page whereTwImage($value)
 * @method static Builder|Page whereUpdatedAt($value)
 */
final class Page extends Model
{
    use HasFactory;
    use WithData;

    protected $fillable = [
      'label',
      'route',
      'meta_desc',
      'meta_image',
      'tw_image',
      'og_image',
      'parent_id',
      'page_type',
      'page_name',
    ];

    protected string $dataClass = PageData::class;

    public function childs(): HasMany
    {
        return $this->hasMany(Page::class, 'parent_id', 'id');
    }

    public function parents(): BelongsTo
    {
        return $this->belongsTo(Page::class, 'parent_id', 'id');
    }

    public function images(): MorphMany
    {
        return $this->morphMany(Library::class, 'imageable');
    }

    public function categories(): MorphToMany
    {
        return $this->morphedByMany(Category::class, 'paggable', 'paggables');
    }

    /**
     * Get Page type query
     */
    public function scopeOfType(Builder $query, string $page_type): Builder
    {
        return $query->where('page_type', $page_type);
    }

    /**
     * Get Model by Page Name
     */
    public function scopeOfName(Builder $query, string $page_name): Model
    {
        return $query->where('page_name', $page_name)->first();
    }

    /**
     * Get Page Meta Data Query
     */
    public function scopePage(
      Builder $query,
      string $page_type,
      string $page
    ): Builder {
        return $query->with('parents')
          ->where('page_type', $page_type)
          ->where('page_name', $page);
    }

    /**
     * Get Parent Page
     */
    public function scopeParent(Builder $query): Builder
    {
        return $query->where('parent_id', 0);
    }

    /**
     * Scope query for current route
     */
    public function scopeRoute(
      Builder $query,
      string $route,
      ?string $fallback = null
    ): Builder {
        return $query->when(
          $route,
          function (Builder $builder) use ($route): void {
              $builder->where('route', $route);
          },
          function (Builder $builder) use ($fallback): void {
              $builder->where('route', $fallback);
          }
        );
    }
}
