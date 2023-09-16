<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Blog;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use App\Services\Blog\ApiResource\TagsApiResource;
use Illuminate\Http\Request;
use Spatie\LaravelData\CursorPaginatedDataCollection;
use Spatie\LaravelData\DataCollection;
use Spatie\LaravelData\PaginatedDataCollection;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

final class TagsController extends Controller
{
    // TO DO
    // IMPLEMENT METHOD TO RETRIVE ALL POSTS BY SPECIFIC TAG
    /**
     * Post Tags Query Builder
     */
    public function __invoke(
        Request $request
    ): DataCollection|CursorPaginatedDataCollection|PaginatedDataCollection {
        $tags = QueryBuilder::for(
            Tag::class
        )->allowedFilters([
            AllowedFilter::exact('name'),
        ])->allowedIncludes(['posts'])
            ->get();

        return TagsApiResource::collection(
            $tags
        );
    }
}
