<?php

declare(strict_types=1);

namespace App\Models;

use App\Services\Library\DataObjects\LibraryData;
use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Support\Carbon;
use Spatie\LaravelData\WithData;

/**
 * App\Models\Library
 *
 * @property int $id
 * @property string $file_name
 * @property string|null $mime_type
 * @property array $conversions
 * @property string $size
 * @property int $width
 * @property int $height
 * @property string $image_url
 * @property int $library_category_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property int|null $imageable_id
 * @property string|null $imageable_type
 * @property-read Model|Eloquent $imageable
 * @property-read LibraryCategory $libraryCategory
 *
 * @method static Builder|Library newModelQuery()
 * @method static Builder|Library newQuery()
 * @method static Builder|Library ofName($file_name)
 * @method static Builder|Library query()
 * @method static Builder|Library whereConversions($value)
 * @method static Builder|Library whereCreatedAt($value)
 * @method static Builder|Library whereFileName($value)
 * @method static Builder|Library whereHeight($value)
 * @method static Builder|Library whereId($value)
 * @method static Builder|Library whereImageUrl($value)
 * @method static Builder|Library whereImageableId($value)
 * @method static Builder|Library whereImageableType($value)
 * @method static Builder|Library whereLibraryCategoryId($value)
 * @method static Builder|Library whereMimeType($value)
 * @method static Builder|Library whereSize($value)
 * @method static Builder|Library whereUpdatedAt($value)
 * @method static Builder|Library whereWidth($value)
 */
final class Library extends Model
{
    use HasFactory;
    use WithData;

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

    protected string $dataClass = LibraryData::class;

    public function libraryCategory(): BelongsTo
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

    public function scopeOfName(Builder $query, $file_name): Builder
    {
        return $query->where('file_name', $file_name);
    }
}
