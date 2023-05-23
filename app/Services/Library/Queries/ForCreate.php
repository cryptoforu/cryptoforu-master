<?php

declare(strict_types=1);

namespace App\Services\Library\Queries;

use App\Models\LibraryCategory;
use App\Services\Library\DataObjects\LibraryCategoryData;

final class ForCreate
{
    public function handle()
    {
        return LibraryCategoryData::collection(
            items: LibraryCategory::all()
        )->toArray();
    }
}
