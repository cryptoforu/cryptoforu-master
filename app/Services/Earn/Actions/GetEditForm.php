<?php

declare(strict_types=1);

namespace App\Services\Earn\Actions;

use App\Models\EarnCategory;
use App\Services\Earn\DataObjects\EarnCategoryData;
use App\Services\Earn\DataObjects\EarnData;
use App\Services\Settings\Concerns\FormFactory;
use Illuminate\Support\Collection;

class GetEditForm
{
    use FormFactory;

    /**
     * Get Edit Form
     */
    public function handle(): array
    {
        $initialValues = (new Collection(items: EarnData::schema()));
        $options = [
            'earn_category_id' => EarnCategoryData::collection(
                items: EarnCategory::all()->map(
                    fn ($e) => $e->getData()
                )
            )->toArray(),
        ];
        $schema = $this->generate(
            items: (new Collection(items: EarnData::schema(type: 'n'))),
            options: $options
        );

        return [
            'initialValues' => $initialValues,
            'form_schema' => $schema,
            'form_route' => route('admin-earn.store', [], false),
        ];
    }
}
