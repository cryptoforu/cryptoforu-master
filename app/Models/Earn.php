<?php

declare(strict_types=1);

namespace App\Models;

use App\Services\Earn\DataObjects\EarnData;
use App\Services\Earn\Enums\FeaturedEnum;
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
    ];

    protected $casts = [
        'featured' => FeaturedEnum::class,
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
}
