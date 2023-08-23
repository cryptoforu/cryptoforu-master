<?php

declare(strict_types=1);

namespace App\Models;

use App\Services\Crypto\DataObjects\CryptoData;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\AsCollection;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

/**
 * App\Models\Crypto
 *
 * @property string $id
 * @property string $data_name
 * @property AsCollection $data_values
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @method static Builder|Crypto newModelQuery()
 * @method static Builder|Crypto newQuery()
 * @method static Builder|Collection ofAllCoins()
 * @method static Builder|Crypto ofCategories()
 * @method static Builder|Crypto ofData(string $data_name, \Illuminate\Database\Eloquent\Collection $data_values)
 * @method static Builder|Crypto ofExchanges()
 * @method static Builder|Crypto ofName(string $data_name)
 * @method static Builder|Crypto ofValues()
 * @method static Builder|Crypto query()
 * @method static Builder|Crypto whereCreatedAt($value)
 * @method static Builder|Crypto whereDataName($value)
 * @method static Builder|Crypto whereDataValues($value)
 * @method static Builder|Crypto whereId($value)
 * @method static Builder|Crypto whereUpdatedAt($value)
 */
final class Crypto extends Model
{
    use HasFactory;
    use HasUlids;

    protected $fillable = ['data_name', 'data_values'];

    protected $casts = [
      'data_values' => AsCollection::class,
    ];

    protected string $dataClass = CryptoData::class;

    public function scopeOfName(Builder $query, string $data_name): Crypto|bool
    {
        return $query->where('data_name', $data_name)->firstOr(
          '*',
          fn() => false
        );
    }

    public function scopeOfValues(Builder $query): Builder|Model
    {
        return $query->where(
          'data_name',
          'all_coins'
        )->select('data_values')
          ->first();
    }

    /**
     * Get All Coins Collection
     */
    public function scopeOfAllCoins(Builder $query): Collection
    {
        return $query->where(
          column: 'data_name',
          value: 'all_coins'
        )->value('data_values');
    }

    public function scopeOfCategories(Builder $query): Model|Builder|null
    {
        return $query->where(
          'data_name',
          'categories'
        )->select('data_values')
          ->first();
    }

    public function scopeOfExchanges(Builder $query): Model|Builder|null
    {
        return $query->where(
          'data_name',
          'exchanges'
        )->select('data_values')
          ->first();
    }

    /**
     * Get The Model or Create it if it doesn't exist
     */
    public function scopeOfData(
      Builder $query,
      string $data_name,
      Collection $data_values
    ): Builder|Model {
        return $query->firstOrCreate(
          ['data_name' => $data_name],
          ['data_values' => $data_values],
        );
    }

    public function getRouteKeyName(): string
    {
        return 'data_name';
    }
}
