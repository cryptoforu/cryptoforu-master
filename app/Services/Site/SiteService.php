<?php

declare(strict_types=1);

namespace App\Services\Site;

use App\Interfaces\Settings\PageInterface;
use App\Interfaces\Site\SiteInterface;
use App\Services\Site\Queries\ShowData;

final class SiteService implements SiteInterface
{
  public function __construct(
    private readonly PageInterface $page,
    private readonly ShowData $show,
  ) {
  }

  /**
   * For Index Site Data
   */
  public function forIndex(): array
  {
    $data = $this->show->handle();
    $meta = lazy_load()->load(
      key: 'admin:site_data',
      callback: fn() => array_merge([
        ...$this->page->admin_meta(),
        'select' => $this->show->handle()['select'],
      ])
    );

    return [
      ...$meta,
      ...lazy_load()->withInertia(
        collection: $data['data'],
      ),

    ];
  }

  /**
   * For Create Site Data
   */
  public function forCreate(): array
  {
    return lazy_load()->load(
      key: 'admin:site_create',
      callback: fn() => array_merge([
        ...$this->page->admin_meta(),
      ])
    );
  }
}
