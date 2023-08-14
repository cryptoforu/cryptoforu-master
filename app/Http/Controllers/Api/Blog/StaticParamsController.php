<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Blog;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Responses\CollectionResponse;
use App\Services\Blog\QueryFilters\MetaDataFilter;
use App\Services\Blog\QueryFilters\StaticParamsFilter;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

final class StaticParamsController extends Controller
{
    /**
     * Generate Next.js Static Params for Posts and Categories
     */
    public function __invoke(Request $request): CollectionResponse
    {

        $data = QueryBuilder::for(
            Post::class
        )->allowedFilters([
            AllowedFilter::exact('category_id'),
            AllowedFilter::exact('category.slug'),
            AllowedFilter::exact('slug'),
            AllowedFilter::custom('metadata', new MetaDataFilter()),
            AllowedFilter::custom('params', new StaticParamsFilter()),
        ])
            ->get()
        ;

        return new CollectionResponse(
            data: $data
        );
    }
}
