<?php

declare(strict_types=1);

namespace App\Services\Blog\Actions;

use App\Services\Blog\DataObjects\CategoryData;
use App\Services\Settings\Concerns\FormFactory;

final class CategoryForm
{
  use FormFactory;

  public function handle(): array
  {
    $initialValues = collect(value: CategoryData::schema());
    $schema = $this->generate(
      items: collect(value: CategoryData::schema(type: 'fields'))
    );

    return [
      'initialValues' => $initialValues,
      'form_schema' => $schema,
      'form_route' => route('admin:blog:category.store', [], false),
    ];
  }
}
