<?php

declare(strict_types=1);

namespace App\Services\Earn;

use App\Interfaces\Earn\EarnServiceInterface;
use App\Interfaces\Settings\PageInterface;
use App\Models\Earn;
use App\Services\Earn\Actions\EditEarn;
use App\Services\Earn\Actions\GetEditForm;
use App\Services\Earn\Actions\ShowEarnData;

final class EarnService implements EarnServiceInterface
{
  public function __construct(
    private readonly PageInterface $page,
    private readonly ShowEarnData $show,
    private readonly GetEditForm $create,
    private readonly EditEarn $edit,
  ) {
  }

  /**
   * Backend Earn Index Page
   */
  public function forIndex(): array
  {
    $data = $this->show->handle();
    $meta = lazy_load()->load(
      key: 'admin:earn_data',
      callback: function () use ($data) {
        return array_merge([
          ...$this->page->admin_meta(),
          'select' => $data['select'],
        ]);
      }
    );

    return array_merge([
      ...$meta,
      ...lazy_load()->withInertia($data['data']),
    ]);
  }

  /**
   * Create Page Data
   */
  public function forCreate(): array
  {
    return lazy_load()->load(
      key: 'admin_earn_create',
      callback: function () {
        return array_merge([
          ...$this->page->admin_meta(),
          'earn_form' => $this->create->handle(),
        ]);
      }
    );
  }

  /**
   * Edit Page Data
   */
  public function forEdit(Earn $earn): array
  {
    return lazy_load()->load(
      key: $earn->title,
      callback: function () use ($earn) {
        return array_merge([
          ...$this->edit->handleMeta($earn),
          'edit_form' => $this->edit->handle($earn),
        ]);
      }
    );
  }
}
