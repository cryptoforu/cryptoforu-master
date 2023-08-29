<?php

declare(strict_types=1);

namespace App\Models;

use App\Services\Earn\DataObjects\EarnCategoryData;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;
use Spatie\LaravelData\WithData;

/**
 * App\Models\EarnCategory
 *
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property string|null $description
 * @property string|null $category_image
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Collection<int, Earn> $earn
 * @property-read int|null $earn_count
 *
 * @method static Builder|EarnCategory newModelQuery()
 * @method static Builder|EarnCategory newQuery()
 * @method static Builder|EarnCategory query()
 * @method static Builder|EarnCategory whereCategoryImage($value)
 * @method static Builder|EarnCategory whereCreatedAt($value)
 * @method static Builder|EarnCategory whereDescription($value)
 * @method static Builder|EarnCategory whereId($value)
 * @method static Builder|EarnCategory whereName($value)
 * @method static Builder|EarnCategory whereSlug($value)
 * @method static Builder|EarnCategory whereUpdatedAt($value)
 */
final class EarnCategory extends Model
{
    use HasFactory;
    use WithData;

    protected $fillable = [
        'name',
        'description',
        'slug',
        'category_image',
    ];

    protected string $dataClass = EarnCategoryData::class;

    public function earn(): HasMany
    {
        return $this->hasMany(Earn::class);
    }
}
