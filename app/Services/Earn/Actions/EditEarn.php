<?php

declare(strict_types=1);

namespace App\Services\Earn\Actions;

use App\Models\Earn;
use App\Models\EarnCategory;
use App\Services\Earn\DataObjects\EarnCategoryData;
use App\Services\Earn\DataObjects\EarnData;
use App\Services\Earn\Enums\EarnStatus;
use App\Services\Settings\Concerns\FormFactory;
use App\Services\Settings\Page\DataObjects\AdminNavigation;
use App\Services\Settings\Page\DataObjects\PageData;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

final class EditEarn
{
    use FormFactory;

    /**
     * Edit Method Form Data
     */
    public function handle(Earn $earn): array
    {
        $initialValues = (new Collection(items: EarnData::editSchema($earn)));
        $options = [
            'earn_category_id' => EarnCategoryData::collection(
                items: EarnCategory::all()->map(
                    fn ($e) => $e->getData()
                )
            )->toArray(),
            'status' => EarnStatus::options(),
        ];

        $schema = $this->generate(
            items: (new Collection(items: EarnData::editSchema(
                earn: $earn,
                type: 'n'
            ))),
            options: $options
        );

        return [
            'initialValues' => $initialValues,
            'form_schema' => $schema,
            'form_route' => route('admin:earn.update', ['earn' => $earn], false),
        ];
    }

    /**
     * Geta Meta Data
     */
    public function handleMeta(Earn $earn): array
    {
        $meta = PageData::fromAttributes([
            'label' => $earn->title,
            'meta_desc' => Str::of($earn->content)->limit(160),
            'meta_image' => $earn->image,
            'parent_id' => 7,
            'page_type' => 'admin',
            'page_name' => 'edit-earn',

        ])->include('parents')->toArray();

        $navigation = AdminNavigation::fromAttributes([
            'label' => 'Earning Methods',
            'route' => 'admin-earn.index',
            'parents' => [
                'label' => 'Earning Methods',
                'route' => 'admin-earn.index',
            ],
        ])->toArray();

        return [
            'meta' => $meta,
            'navigation' => $navigation,
        ];
    }
}
