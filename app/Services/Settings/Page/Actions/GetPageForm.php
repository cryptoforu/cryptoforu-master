<?php

declare(strict_types=1);

namespace App\Services\Settings\Page\Actions;

use App\Models\Page;
use App\Services\Settings\Concerns\FormFactory;
use App\Services\Settings\Page\DataObjects\PageData;
use Illuminate\Support\Collection;

final class GetPageForm
{
  use FormFactory;

  public function handle(): array
  {
    $initialValues = (new Collection(items: PageData::schema()));
    $options = [
      'parent_id' => Page::parent()
        ->get(['id', 'label'])->toArray(),
    ];
    $schema = $this->generate(
      items: (new Collection(items: PageData::schema(type: 'n'))),
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
