<?php

declare(strict_types=1);

namespace App\Services\Blog\Actions;

use App\Models\Category;
use App\Services\Blog\DataObjects\CategoryData;
use App\Services\Settings\Concerns\FormFactory;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Inertia\LazyProp;

final class ShowCategories
{
    use FormFactory;

    /**
     * Blog Categories
     */
    public function handle(): LazyProp|array
    {
        $values = (new Collection(
            items: Category::all()
        ))->map(fn ($category) => [
            'initialValues' => CategoryData::schema(category: $category, type: 'edit'),
            'form_schema' => $this->generate(
                items: (new Collection(items: CategoryData::schema(type: 'fields')))
            ),
            'form_route' => route('admin-categories.update', ['category' => $category]),
        ])->keyBy(fn (array $item, int $key) => $item['initialValues']['name']);

        return $values->map(
            fn ($item, $key) => 'DeFi' === $key ? fn () => $item
                : Inertia::lazy(
                    fn () => $item
                )
        )->all();
    }
}
