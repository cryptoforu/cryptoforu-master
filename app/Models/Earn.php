<?php

declare(strict_types=1);

namespace App\Models;

use App\Services\Earn\DataObjects\EarnData;
use App\Services\Earn\Enums\EarnStatus;
use App\Services\Earn\Enums\FeaturedEnum;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Carbon;
use Spatie\Enum\Enum;
use Spatie\LaravelData\WithData;

/**
 * App\Models\Earn
 *
 * @property int $id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string $title
 * @property string $slug
 * @property string $content
 * @property string|null $image
 * @property string|null $thumb
 * @property string|null $link
 * @property Enum|null $featured
 * @property string|null $image_name
 * @property int $earn_category_id
 * @property int|null $post_id
 * @property string|null $main_features
 * @property Enum|null|null $status
 * @property Enum|null $nullable_enum
 * @property Enum[]|null $array_of_enums
 * @property Enum[]|null $nullable_array_of_enums
 * @property-read EarnCategory $earnCategory
 * @property-read Collection<int, Library> $images
 * @property-read int|null $images_count
 * @property-read Post|null $post
 *
 * @method static Builder|Earn newModelQuery()
 * @method static Builder|Earn newQuery()
 * @method static Builder|Earn ofFeatured(FeaturedEnum $featured)
 * @method static Builder|Earn ofStatus(string $status)
 * @method static Builder|Earn query()
 * @method static Builder|Earn whereContent($value)
 * @method static Builder|Earn whereCreatedAt($value)
 * @method static Builder|Earn whereEarnCategoryId($value)
 * @method static Builder|Earn whereFeatured($value)
 * @method static Builder|Earn whereId($value)
 * @method static Builder|Earn whereImage($value)
 * @method static Builder|Earn whereImageName($value)
 * @method static Builder|Earn whereLink($value)
 * @method static Builder|Earn whereMainFeatures($value)
 * @method static Builder|Earn wherePostId($value)
 * @method static Builder|Earn whereSlug($value)
 * @method static Builder|Earn whereStatus($value)
 * @method static Builder|Earn whereThumb($value)
 * @method static Builder|Earn whereTitle($value)
 * @method static Builder|Earn whereUpdatedAt($value)
 */
final class Earn extends Model
{
    use HasFactory;
    use WithData;

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
        'nullable_enum' => EarnStatus::class . ':nullable',
        'array_of_enums' => EarnStatus::class . ':collection',
        'nullable_array_of_enums' => EarnStatus::class . ':collection,nullable',
    ];

    protected string $dataClass = EarnData::class;

    public function earnCategory(): BelongsTo
    {
        return $this->belongsTo(EarnCategory::class);
    }

    public function post(): HasOne
    {
        return $this->hasOne(Post::class);
    }

    public function images(): MorphMany
    {
        return $this->morphMany(Library::class, 'imageable');
    }

    public function scopeOfFeatured(
        Builder $query,
        FeaturedEnum $featured
    ): Builder {
        return $query->where('featured', $featured);
    }

    public function scopeOfStatus(Builder $query, string $status): Builder
    {
        return $query->where('status', EarnStatus::tryFrom($status));
    }
}
