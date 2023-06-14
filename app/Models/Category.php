<?php

declare(strict_types=1);

namespace App\Models;

use App\Services\Blog\DataObjects\CategoryData;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Support\Collection;
use Spatie\LaravelData\WithData;

final class Category extends Model
{
    use HasFactory;
    use WithData;

    protected $fillable = [
        'name',
        'description',
        'slug',
        'category_image',
        'category_thumb',
        'posts',
    ];

    protected $dataClass = CategoryData::class;

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function image(): MorphOne
    {
        return $this->morphOne(Library::class, 'imageable');
    }

    public function scopeOfData(): Collection
    {
        return $this->all()
            ->map(
                fn ($category) => CategoryData::fromData($category)
            )
        ;
    }

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    /**
     * Retrieve the model for a bound value.
     *
     * @param  mixed  $value
     * @param  string|null  $field
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function resolveRouteBinding($value, $field = null)
    {
        return $this->where('slug', $value)->firstOrFail();
    }
}
