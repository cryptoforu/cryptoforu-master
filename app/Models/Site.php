<?php

declare(strict_types=1);

namespace App\Models;

use App\Services\Site\DataObjects\PageData;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\AsCollection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Spatie\LaravelData\WithData;

final class Site extends Model
{
    use HasFactory, WithData;

    protected $fillable = [
        'data_name',
        'data_values',
    ];

    protected $dataClass = PageData::class;

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

    public function scopeOfData(Builder $query, string $data_name): Site
    {
        return $query->where('data_name', $data_name)->first();
    }
}
