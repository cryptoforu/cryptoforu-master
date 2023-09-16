<?php

declare(strict_types=1);

namespace App\Services\Settings\Page\Actions;

use App\Models\Page;
use Illuminate\Support\Facades\Route;
use Spatie\LaravelData\Exceptions\InvalidDataClass;

final class GetPageMeta
{
  /**
   * Handle Page Meta Data
   * @throws InvalidDataClass
   */
  public function handle(
    string $page_type = 'admin',
    ?string $page = 'dashboard'
  ): array {
    return Page::ofType($page_type)
      ->route(Route::currentRouteName(), $page)
      ->first()->getData()->toArray();
  }
}
