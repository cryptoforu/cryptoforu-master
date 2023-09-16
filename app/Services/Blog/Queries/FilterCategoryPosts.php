<?php

declare(strict_types=1);

namespace App\Services\Blog\Queries;

use App\Models\Category;
use App\Models\Post;
use App\Services\Blog\QueryFilters\CategoryRelatedFilter;
use App\Services\Blog\QueryFilters\FilterPostStatus;
use App\Services\Blog\QueryFilters\PostIdFilter;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

final class FilterCategoryPosts extends QueryBuilder
{
    public function __construct(Category $category)
    {
        $postsQuery = Post::query()
            ->where('category_id', $category->id)
            ->with(['category', 'tags:id,name']);

        parent::__construct($postsQuery);

        $this->allowedFilters([
            AllowedFilter::exact('id'),
            AllowedFilter::exact('slug'),
            AllowedFilter::custom('postStatus', new FilterPostStatus()),
            AllowedFilter::custom('related', new CategoryRelatedFilter()),
            AllowedFilter::custom('postId', new PostIdFilter()),
        ]);

        $this->allowedFields([
            'id', 'title', 'slug', 'category_id', 'status',
            'categories.name', 'categories.slug',
        ]);
    }
}
