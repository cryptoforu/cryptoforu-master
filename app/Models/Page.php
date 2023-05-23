<?php

declare(strict_types=1);

namespace App\Models;

use App\Services\Settings\Page\DataObjects\PageData;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Spatie\LaravelData\WithData;

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

    protected $dataClass = PageData::class;

    public function childs()
    {
        return $this->hasMany(Page::class, 'parent_id', 'id');
    }

    public function parents()
    {
        return $this->belongsTo(Page::class, 'parent_id', 'id');
    }

    public function images(): MorphMany
    {
        return $this->morphMany(Library::class, 'imageable');
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
    public function scopePage(Builder $query, string $page_type, string $page): Builder
    {
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
    public function scopeRoute(Builder $query, string $route): Builder
    {
        return $query->where('route', $route);
    }
}
