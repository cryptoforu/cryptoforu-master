<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\AsCollection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

/**
 * @property string $list_name
 * @property string $currency
 * @property Collection $coin_data
 * @property Collection $list_data
 */
class FaucetPayList extends Model
{
  use HasFactory;

  protected $fillable = [
    'list_name',
    'currency',
    'coin_data',
    'list_data',
  ];

  protected $casts = [
    'coin_data' => AsCollection::class,
    'list_data' => AsCollection::class,
  ];
}
