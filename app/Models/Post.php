<?php

declare(strict_types=1);

namespace App\Models;

use App\Services\Blog\DataObjects\PostData;
use App\Services\Blog\Enums\PostStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Spatie\LaravelData\WithData;

final class Post extends Model
{
    use HasFactory;
    use WithData;

    protected $fillable = [
        'title',
        'content',
        'introduction',
        'slug',
        'featured_image',
        'thumb',
        'category_id',
        'image_name',
        'excerpt',
        'status',
    ];

    protected $dataClass = PostData::class;

    protected $casts = [
        'status' => PostStatus::class,
        'nullable_enum' => PostStatus::class . ':nullable',
        'array_of_enums' => PostStatus::class . ':collection',
        'nullable_array_of_enums' => PostStatus::class . ':collection,nullable',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class)->as('tags');
    }

    public function images(): MorphMany
    {
        return $this->morphMany(Library::class, 'imageable');
    }

    public function scopeOfStatus(Builder $query, PostStatus $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
