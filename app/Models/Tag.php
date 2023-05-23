<?php

declare(strict_types=1);

namespace App\Models;

use App\Services\Blog\DataObjects\TagsData;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\LaravelData\WithData;

final class Tag extends Model
{
    use HasFactory;
    use WithData;

    protected $fillable = [
        'name',
    ];

    protected $dataClass = TagsData::class;

    public function posts()
    {
        return $this->belongsToMany(Post::class);
    }

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
