<?php

declare(strict_types=1);

namespace App\Services\Blog\Actions;

use App\Services\Blog\DataObjects\CategoryData;
use App\Services\Settings\Concerns\FormFactory;
use Illuminate\Support\Collection;

final class CategoryForm
{
    use FormFactory;

    public function handle(): array
    {
        $initialValues = (new Collection(items: CategoryData::schema()));
        $schema = $this->generate(
            items: (new Collection(items: CategoryData::schema(type: 'fields')))
        );

        return [
            'initialValues' => $initialValues,
            'form_schema' => $schema,
            'form_route' => route('admin:blog:category.store', [], false),
        ];
    }
}
