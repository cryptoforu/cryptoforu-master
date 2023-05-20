<?php

declare(strict_types=1);

namespace App\Models;

use App\Services\Library\DataObjects\LibraryCategoryData;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\LaravelData\WithData;

class LibraryCategory extends Model
{
    use HasFactory, WithData;

    protected $fillable = [
        'name',
        'directory',
    ];

    protected $dataClass = LibraryCategoryData::class;

    public function media()
    {
        return $this->hasMany(Library::class);
    }

    /**
     * Scope a query to only include certain category.
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeCategory(Builder $query, $category)
    {
        return $query->where('name', $category);
    }

    /**
     * Scope a query to only include
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOfDirectory($query, $directory)
    {
        return $query->where('directory', $directory);
    }
}
