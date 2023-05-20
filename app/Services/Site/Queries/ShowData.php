<?php
namespace App\Services\Site\Queries;

use App\Models\Site;
use App\Services\Site\DataObjects\PageData;
use App\Traits\Selectable;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class ShowData
{
    use Selectable;

    public function handle()
    {
        $query = Site::all();
        $data = (
            new Collection(
                items:PageData::collection(
                    items:$query->map(fn($item) => $item->getData())
                )
            )
        )->keyBy(fn(array $i) => Str::slug($i['data_name']));
        return collect([
            'data' => $data,
            'select' => $this->selectable($data, 'data_name'),
        ]);

    }
}
