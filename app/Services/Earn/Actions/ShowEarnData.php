<?php

declare(strict_types=1);

namespace App\Services\Earn\Actions;

use App\Models\EarnCategory;
use App\Services\Earn\DataObjects\EarnCategoryData;
use App\Traits\Selectable;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

final class ShowEarnData
{
  use Selectable;

  /**
   * Show earn Data
   */
  public function handle(): Collection
  {
    $earn = EarnCategory::with('earn')->get();

    $data = (new Collection(
      items: EarnCategoryData::collection(
        items: $earn->map(fn($e) => $e->getData())
      )->include('earn.{content,image,image_name,main_features,link}')
    ))->keyBy(fn(array $item) => Str::slug($item['name']));

    return collect([
      'data' => $data,
      'select' => $this->selectable($data, 'name'),
    ]);
  }
}
