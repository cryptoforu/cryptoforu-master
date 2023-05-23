<?php

declare(strict_types=1);

namespace App\Models;

use App\Services\Settings\Menu\DataObjects\MenuData;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\LaravelData\WithData;

final class Menu extends Model
{
    use HasFactory;
    use WithData;

    protected $fillable = [
        'label',
        'position',
    ];

    protected $dataClass = MenuData::class;

    public function items()
    {
        return $this->hasMany(MenuItem::class);
    }

    /**
     * Scope a query to only include menu of a given position.
     */
    public function scopeOfPosition(Builder $query, string $position): void
    {
        $query->where('position', $position);
    }

    public function scopeOfMain(
        Builder $query,
        string $position = 'front_main'
    ): Model {
        return $query
            ->where('position', $position)
            ->with('items')->first()
        ;
    }
}
