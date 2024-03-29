<?php

declare(strict_types=1);

namespace App\Services\Settings\Page\Actions;

use App\Models\Page;
use App\Services\Settings\Concerns\FormFactory;
use App\Services\Settings\Page\DataObjects\PageData;

final class GetPageForm
{
  use FormFactory;

  public function handle(): array
  {
    $initialValues = collect(value: PageData::schema());
    $options = [
      'parent_id' => Page::parent()
        ->get(['id', 'label'])->toArray(),
    ];
    $schema = $this->generate(
      items: collect(value: PageData::schema(type: 'n')),
      options: $options
    );

    return [
      'initialValues' => $initialValues,
      'form_schema' => $schema,
      'form_route' => route(
        'admin:settings:action',
        ['action' => 'store_page']
      ),
    ];
  }
}
