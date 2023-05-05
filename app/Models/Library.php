<?php

declare(strict_types=1);

namespace App\Models;

use App\Services\Library\DataObjects\LibraryData;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Spatie\LaravelData\WithData;

class Library extends Model
{
    use HasFactory, WithData;

    protected $fillable = [
        'file_name',
        'mime_type',
        'conversions',
        'size',
        'image_url',
        'width',
        'height',
        'library_category_id',
        'imageable_id',
        'imageable_type',
    ];

    protected $casts = [
        'conversions' => 'array',
    ];

    protected $dataClass = LibraryData::class;

    public function libraryCategory()
    {
        return $this->belongsTo(LibraryCategory::class);
    }

    /**
     * Get the parent imageable model (user or post).
     */
    public function imageable(): MorphTo
    {
        return $this->morphTo();
    }

    public function scopeOfName(Builder $query, $file_name)
    {
        return $query->where('file_name', $file_name);
    }
}
