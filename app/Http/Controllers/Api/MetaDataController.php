<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class MetaDataController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $cache_key = $request->query('filter');

        return lazy_load()->load(
            key: $cache_key['page_name'],
            callback: fn () => QueryBuilder::for(Page::class)
                ->allowedFilters([
                    'page_name',
                ])->select(['label', 'meta_desc'])->first()
        );

    }
}
