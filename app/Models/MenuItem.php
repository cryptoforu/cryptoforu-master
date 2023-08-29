<?php

declare(strict_types=1);

namespace App\Models;

use App\Services\Settings\Menu\DataObjects\MenuItemsData;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Carbon;
use Spatie\LaravelData\WithData;

/**
 * App\Models\MenuItem
 *
 * @property int $id
 * @property string $label
 * @property string|null $route
 * @property string|null $icon
 * @property int $parent_id
 * @property int $menu_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Collection<int, MenuItem> $childs
 * @property-read int|null $childs_count
 * @property-read Collection<int, Library> $images
 * @property-read int|null $images_count
 * @property-read Menu|null $menu
 * @property-read MenuItem|null $parents
 *
 * @method static Builder|MenuItem newModelQuery()
 * @method static Builder|MenuItem newQuery()
 * @method static Builder|MenuItem|Collection ofItems(Menu $menu)
 * @method static Builder|MenuItem ofMain()
 * @method static Builder|MenuItem parent()
 * @method static Builder|MenuItem query()
 * @method static Builder|MenuItem route(string $route)
 * @method static Builder|MenuItem whereCreatedAt($value)
 * @method static Builder|MenuItem whereIcon($value)
 * @method static Builder|MenuItem whereId($value)
 * @method static Builder|MenuItem whereLabel($value)
 * @method static Builder|MenuItem whereMenuId($value)
 * @method static Builder|MenuItem whereParentId($value)
 * @method static Builder|MenuItem whereRoute($value)
 * @method static Builder|MenuItem whereUpdatedAt($value)
 */
final class MenuItem extends Model
{
    use HasFactory;
    use WithData;

    protected $fillable = [
        'label',
        'route',
        'icon',
        'parent_id',
        'menu_id',
    ];

    protected string $dataClass = MenuItemsData::class;

    public function childs(): HasMany
    {
        return $this->hasMany(MenuItem::class, 'parent_id', 'id');
    }

    public function parents(): BelongsTo
    {
        return $this->belongsTo(MenuItem::class, 'parent_id', 'id');
    }

    public function menu(): BelongsTo
    {
        return $this->belongsTo(Menu::class);
    }

    public function images(): MorphMany
    {
        return $this->morphMany(Library::class, 'imageable');
    }

    /**
     * Scope query for current route
     */
    public function scopeRoute(Builder $query, string $route): Builder
    {
        return $query->where('route', $route);
    }

    /**
     * Get Parent Menu
     */
    public function scopeParent(Builder $query): Builder
    {
        return $query->where('parent_id', 0);
    }

    public function scopeOfMain(Builder $query): Collection|array
    {
        return $query->whereBelongsTo(
            Menu::query()
                ->where('position', 'front_main')
                ->with('items')->first()
        )->with('parents:id,label,route,parent_id')
            ->select(['id', 'label', 'route', 'parent_id'])->get()
        ;
    }

    public function scopeOfItems(
        Builder $query,
        Menu $menu
    ): Collection|array {
        return $query->whereBelongsTo($menu)
            ->where('parent_id', 0)
            ->with('childs')->get()
        ;
    }
}
