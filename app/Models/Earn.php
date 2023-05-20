<?php

declare(strict_types=1);

namespace App\Models;

use App\Services\Earn\DataObjects\EarnData;
use App\Services\Earn\Enums\EarnStatus;
use App\Services\Earn\Enums\FeaturedEnum;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Spatie\LaravelData\WithData;

class Earn extends Model
{
    use HasFactory, WithData;

    protected $fillable = [
        'title',
        'content',
        'slug',
        'image',
        'thumb',
        'link',
        'featured',
        'image_name',
        'earn_category_id',
        'post_id',
        'main_features',
        'status',
    ];

    protected $casts = [
        'featured' => FeaturedEnum::class,
        'status' => EarnStatus::class,
        'nullable_enum' => EarnStatus::class.':nullable',
        'array_of_enums' => EarnStatus::class.':collection',
        'nullable_array_of_enums' => EarnStatus::class.':collection,nullable',
    ];

    protected $dataClass = EarnData::class;

    public function earnCategory(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(EarnCategory::class);
    }

    public function post()
    {
        return $this->hasOne(Post::class);
    }

    public function images(): MorphMany
    {
        return $this->morphMany(Library::class, 'imageable');
    }

    public function scopeOfFeatured(Builder $query, FeaturedEnum $featured)
    {
        return $query->where('featured', $featured);
    }

    public function scopeOfStatus(Builder $query, EarnStatus $status)
    {
        return $query->where('status', $status);
    }
}
