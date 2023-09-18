<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Sushi\Sushi;

final class State extends Model
{
  use Sushi;

  protected $fillable = [
    'state_key',
    'state_value',
    'stateable_id',
    'stateable_type'
  ];

  protected array $rows = [
    [
      'state_key' => 'page_size',
      'state_value' => '6',
      'stateable_id' => '',
      'stateable_type' => ''
    ]
  ];

  public function stateable(): MorphTo
  {
    return $this->morphTo();
  }

}
