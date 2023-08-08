<?php

declare(strict_types=1);

namespace App\Models;

use App\Services\Settings\Menu\DataObjects\MenuData;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;
use Spatie\LaravelData\WithData;

/**
 * App\Models\Menu
 *
 * @property int $id
 * @property string $label
 * @property string $position
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Collection<int, MenuItem> $items
 * @property-read int|null $items_count
 *
 * @method static Builder|Menu newModelQuery()
 * @method static Builder|Menu newQuery()
 * @method static Builder|Menu ofMain(string $position = 'front_main')
 * @method static Builder|Menu ofPosition(string $position)
 * @method static Builder|Menu query()
 * @method static Builder|Menu whereCreatedAt($value)
 * @method static Builder|Menu whereId($value)
 * @method static Builder|Menu whereLabel($value)
 * @method static Builder|Menu wherePosition($value)
 * @method static Builder|Menu whereUpdatedAt($value)
 */
final class Menu extends Model
{
    use HasFactory;
    use WithData;

    protected $fillable = [
        'label',
        'position',
    ];

    protected $dataClass = MenuData::class;

    public function items(): HasMany
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
