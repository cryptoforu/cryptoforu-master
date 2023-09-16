<?php

declare(strict_types=1);

namespace App\Services\Blog\Actions;

use App\Models\Category;
use App\Services\Blog\DataObjects\CategoryData;
use App\Services\Settings\Concerns\FormFactory;
use Illuminate\Support\Collection;

final class ShowCategories
{
  use FormFactory;

  /**
   * Blog Categories
   */
  public function handle(): Collection
  {
    return collect(
      value: Category::all()
    )->map(fn($category) => [
      'initialValues' => CategoryData::schema(
        category: $category,
        type: 'edit'
      ),
      'form_schema' => $this->generate(
        items: collect(
          value: CategoryData::schema(type: 'fields')
        )
      ),
      'form_route' => route(
        'admin:blog:category.update',
        ['category' => $category]
      ),
    ])->keyBy(fn(array $item, int $key) => $item['initialValues']['name']);
  }
}
