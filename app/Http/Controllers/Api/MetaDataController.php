<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Contracts\CacheContract;
use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class MetaDataController extends Controller
{
    public function __construct(
        private readonly CacheContract $cache,
    ) {
    }

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $cache_key = $request->query('filter');

        return $this->cache->load(
            key: $cache_key['page_name'] ?? $cache_key['route'] ?? $cache_key['page_type'],
            callback: fn () => QueryBuilder::for(Page::class)
                ->allowedFilters([
                    'page_name', 'route', 'page_type',
                ])->select(['label', 'meta_desc', 'route'])->first()
        );

    }
}
