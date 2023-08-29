<?php

declare(strict_types=1);

namespace App\Models;

use App\Services\Library\DataObjects\LibraryCategoryData;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;
use Spatie\LaravelData\WithData;

/**
 * App\Models\LibraryCategory
 *
 * @property int $id
 * @property string $name
 * @property string $directory
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Collection<int, Library> $media
 * @property-read int|null $media_count
 *
 * @method static Builder|LibraryCategory category($category)
 * @method static Builder|LibraryCategory newModelQuery()
 * @method static Builder|LibraryCategory newQuery()
 * @method static Builder|LibraryCategory ofDirectory($directory)
 * @method static Builder|LibraryCategory query()
 * @method static Builder|LibraryCategory whereCreatedAt($value)
 * @method static Builder|LibraryCategory whereDirectory($value)
 * @method static Builder|LibraryCategory whereId($value)
 * @method static Builder|LibraryCategory whereName($value)
 * @method static Builder|LibraryCategory whereUpdatedAt($value)
 *
 *
 */
final class LibraryCategory extends Model
{
    use HasFactory;
    use WithData;

    protected $fillable = [
      'name',
      'directory',
    ];

    protected string $dataClass = LibraryCategoryData::class;

    public function media(): HasMany
    {
        return $this->hasMany(Library::class);
    }

    /**
     * Scope a query to only include certain category.
     */
    public function scopeCategory(Builder $query, $category): Builder
    {
        return $query->where('name', $category);
    }

    /**
     * Scope a query to only include
     */
    public function scopeOfDirectory(Builder $query, $directory): Builder
    {
        return $query->where('directory', $directory);
    }
}
