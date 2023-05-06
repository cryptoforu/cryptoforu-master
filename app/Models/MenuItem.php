<?php

declare (strict_types = 1);

namespace App\Models;

use App\Services\Settings\Menu\DataObjects\MenuItemsData;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Spatie\LaravelData\WithData;

class MenuItem extends Model
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

    protected $dataClass = MenuItemsData::class;

    public function childs()
    {
        return $this->hasMany(MenuItem::class, 'parent_id', 'id');
    }

    public function menu()
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
}
