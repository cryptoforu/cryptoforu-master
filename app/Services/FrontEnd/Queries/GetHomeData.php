<?php

declare(strict_types=1);

namespace App\Services\FrontEnd\Queries;

use App\Enums\ColorScheme;
use App\Models\Category;
use App\Models\Tag;
use App\Services\Blog\DataObjects\CategoryData;
use App\Services\Blog\DataObjects\TagsData;
use App\Services\Site\DataObjects\HomePage\HomePageData;
use Illuminate\Support\Collection;

final class GetHomeData
{
    public function __construct(
        private readonly EarnCategoriesQuery $earn_categories,
        private readonly LatestPostsQuery $latest_posts,
    ) {

    }

    public function handle()
    {
        return [
            'data' => HomePageData::fromData(),
            'categories' => (new Collection(
                items: Category::all()->map(
                    fn ($cat) => CategoryData::fromData($cat)->additional(
                        ['color' => ColorScheme::randColor()]
                    )
                )
            ))->only([5, 8, 9])->toArray(),
            'posts' => $this->latest_posts->handle(),
            'tags' => (new Collection(
                items: Tag::all()->map(fn ($t) => TagsData::from($t))
            ))->toArray(),
            'earn_categories' => $this->earn_categories->handle(),
        ];
    }
}
