<?php
declare (strict_types = 1);
namespace App\Services\FrontEnd\Queries;

use App\Enums\ColorScheme;
use App\Models\EarnCategory;
use App\Services\Earn\DataObjects\EarnCategoryData;
use App\Services\Earn\Enums\EarnStatus;

class EarnCategoriesQuery
{
    public function handle()
    {
        $query = EarnCategory::whereIn('id', [1, 2, 7, 8])->get()->map(
            function ($item, $key) {
                $item->load(['earn' => function ($query) {
                    $query->ofStatus(EarnStatus::FEATURED());
                }]);
                return EarnCategoryData::from($item)
                    ->additional(['color' => ColorScheme::randColor()])
                    ->include('earn.{id,title,image_name,link,main_features}');
            }
        );

        return $query->toArray();
    }
}
