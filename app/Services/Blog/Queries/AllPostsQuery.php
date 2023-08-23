<?php

declare(strict_types=1);

namespace App\Services\Blog\Queries;

use App\Interfaces\Blog\Contracts\AllPostsContract;
use App\Services\Blog\QueryFilters\CategoryRelatedFilter;
use App\Services\Blog\QueryFilters\FilterLatestPosts;
use App\Services\Blog\QueryFilters\FilterPostStatus;
use App\Services\Blog\QueryFilters\StaticParamsFilter;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

final class AllPostsQuery implements AllPostsContract
{
    public function handle(Builder $query): Builder
    {
        return QueryBuilder::for(
            subject: $query
        )->allowedFilters([
            AllowedFilter::exact('id'),
            AllowedFilter::exact('category_id'),
            AllowedFilter::exact('category.slug'),
            AllowedFilter::custom('postStatus', new FilterPostStatus()),
            AllowedFilter::custom('latest', new FilterLatestPosts()),
            AllowedFilter::custom('related', new CategoryRelatedFilter()),
            AllowedFilter::custom('params', new StaticParamsFilter()),

        ])
            ->allowedFields([
                'id', 'title', 'slug', 'category_id', 'categories.id',
                'categories.name', 'categories.slug',
            ])
            ->allowedIncludes(
                includes: ['category', 'tags']
            )
            ->getEloquentBuilder()
        ;
    }
}
