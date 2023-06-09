<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\AsCollection;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

final class Crypto extends Model
{
    use HasFactory, HasUlids;

    protected $fillable = ['data_name', 'data_values'];

    protected $casts = [
        'data_values' => AsCollection::class,
    ];

    protected $dataClass = CryptoData::class;

    public function scopeOfName(Builder $query, string $data_name): Crypto|bool
    {
        return $query->where('data_name', $data_name)->firstOr('*', fn () => (bool) false);
    }

    public function scopeOfValues(Builder $query)
    {
        return $query->where(
            'data_name',
            'all_coins'
        )->select('data_values')
            ->first()
        ;
    }

    public function scopeOfCategories(Builder $query)
    {
        return $query->where(
            'data_name',
            'categories'
        )->select('data_values')
            ->first()
        ;
    }

    public function scopeOfExchanges(Builder $query)
    {
        return $query->where(
            'data_name',
            'exchanges'
        )->select('data_values')
            ->first()
        ;
    }

    /**
     * Get The Model or Create it if it doesn't exists
     */
    public function scopeOfData(
        Builder $query,
        string $data_name,
        Collection $data_values
    ): Crypto {
        return $query->firstOrCreate(
            ['data_name' => $data_name],
            ['data_values' => $data_values],
        );
    }
}
