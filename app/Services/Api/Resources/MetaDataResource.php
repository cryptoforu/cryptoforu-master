<?php

declare(strict_types=1);

namespace App\Services\Api\Resources;

use App\Contracts\ApiCacheContract;
use App\Models\Page;
use Illuminate\Support\Facades\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

final readonly class MetaDataResource
{
    /**
     * Meta Data Api Resource Instance
     */
    public function __construct(
        private ApiCacheContract $cache,
    ) {
    }

    /**
     * Get MetaData For Page
     */
    public function get_meta_data(): Page
    {
        $cache_key = Request::query('filter');

        return $this->cache->load_data(
            key: $cache_key['page_name'] ?? $cache_key['route'] ?? $cache_key['page_type'],
            callback: function () {
                return QueryBuilder::for(Page::class)
                    ->allowedFilters([
                        AllowedFilter::exact('page_name'),
                        'route', 'page_type',
                    ])->select(['label', 'meta_desc', 'route'])->first();
            }
        );
    }
}
