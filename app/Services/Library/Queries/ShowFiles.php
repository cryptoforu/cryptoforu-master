<?php

declare(strict_types=1);

namespace App\Services\Library\Queries;

use App\Models\LibraryCategory;
use App\Services\Library\DataObjects\LibraryCategoryData;
use App\Traits\Selectable;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class ShowFiles
{
    use Selectable;

    /**
     * Get Files Per Category
     */
    public function handle(): Collection
    {
        $lib = LibraryCategory::with('media')->get();
        $data = (new Collection(
            items: LibraryCategoryData::collection(
                items: $lib->map(fn ($l) => $l->getData())
            )->include('media.{conversions,size,width,height}')
        ))->keyBy(fn (array $item) => Str::slug($item['name']));

        return collect([
            'data' => $data,
            'select' => $this->selectable($data, 'name'),
        ]);
    }
}
