<?php

declare(strict_types=1);

namespace App\Services\Settings\Page\Actions;

use App\Models\Page;
use App\Services\Settings\Concerns\FormFactory;
use App\Services\Settings\Page\DataObjects\PageData;
use App\Traits\Selectable;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

final class ShowPageMeta
{
    use FormFactory, Selectable;

    /**
     * Handle Edit Page Meta Form
     */
    public function handle(): Collection|array
    {
        $options = [
            'parent_id' => Page::parent()->get(['id', 'label'])->transform(function (
                $item,
                $key
            ) {
                return [
                    'id' => $item['id'],
                    'name' => $item['label'],
                ];
            })->toArray(),
        ];
        $values = (new Collection(
            items: Page::all()
        ))->map(fn ($item) => [
            'initialValues' => PageData::editSchema($item, 'initialValues'),
            'form_schema' => $this->generate(
                items: (new Collection(items: PageData::editSchema($item, 'n'))),
                options: $options
            ),
            'form_route' => route(
                'admin:settings:page.update',
                ['page' => $item->id],
                false
            ),
        ])->keyBy(fn (
            array $item,
            int $key
        ) => Str::slug($item['initialValues']['page_name']));

        return collect([
            'data' => $values,
            'select' => [
                'admin' => $this->selectable(
                    collection: Page::ofType('admin')->get([
                        'id', 'label', 'page_name',
                    ])->keyBy(fn ($item, int $key) => $item['page_name']),
                    keyFrom: 'page_name',
                ),
                'front' => $this->selectable(
                    collection: Page::ofType('front')->get([
                        'id', 'label', 'page_name',
                    ])->keyBy(fn ($item, int $key) => $item['page_name']),
                    keyFrom: 'page_name',
                ),
            ],
        ]);
    }
}
