<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Site;

use App\Http\Controllers\Controller;
use App\Models\Site;
use App\Responses\CollectionResponse;
use App\Responses\ErrorResponse;
use App\Services\Site\DataObjects\PageData;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

final class SiteResourceController extends Controller
{
    /**
     * Home Api Resource Instance
     */
    public function __construct()
    {
    }

    /**
     * Query Builder For Home Page Data
     */
    public function __invoke(
        Request $request,
        Site $site,
    ): CollectionResponse|ErrorResponse {
        $data = QueryBuilder::for($site)
            ->allowedFilters([AllowedFilter::exact('data_name')])
            ->allowedFields(['data_values'])
            ->find($site->id);

        return new CollectionResponse(
            data: PageData::fromDataValues(
                site: $data
            )
        );
    }
}
