<?php

declare(strict_types=1);

namespace App\Models;

use App\Services\Site\DataObjects\PageData;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\AsCollection;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Carbon;
use Spatie\LaravelData\WithData;

/**
 * App\Models\Site
 *
 * @property int $id
 * @property string $data_name
 * @property AsCollection $data_values
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Collection<int, Library> $images
 * @property-read int|null $images_count
 *
 * @method static Builder|Site newModelQuery()
 * @method static Builder|Site newQuery()
 * @method static Builder|Site ofData(string $data_name)
 * @method static Builder|Site query()
 * @method static Builder|Site whereCreatedAt($value)
 * @method static Builder|Site whereDataName($value)
 * @method static Builder|Site whereDataValues($value)
 * @method static Builder|Site whereId($value)
 * @method static Builder|Site whereUpdatedAt($value)
 *
 *
 */
final class Site extends Model
{
    use HasFactory;
    use WithData;

    protected $fillable = [
      'data_name',
      'data_values',
    ];

    protected string $dataClass = PageData::class;

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
      'data_values' => AsCollection::class,
    ];

    public function images(): MorphMany
    {
        return $this->morphMany(Library::class, 'imageable');
    }

    public function scopeOfData(
      Builder $query,
      string $data_name
    ): Builder|Model|null {
        return $query->where('data_name', $data_name)->first();
    }

    public function getRouteKeyName(): string
    {
        return 'data_name';
    }
}
