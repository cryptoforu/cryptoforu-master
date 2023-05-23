<?php

declare(strict_types=1);

namespace App\Models;

use App\Services\Earn\DataObjects\EarnCategoryData;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\LaravelData\WithData;

final class EarnCategory extends Model
{
    use HasFactory, WithData;

    protected $fillable = [
        'name',
        'description',
        'slug',
        'category_image',
    ];

    protected $dataClass = EarnCategoryData::class;

    public function earn()
    {
        return $this->hasMany(Earn::class);
    }
}
