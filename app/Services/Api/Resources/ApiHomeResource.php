<?php
/** @noinspection PhpUndefinedMethodInspection */

declare(strict_types=1);

namespace App\Services\Api\Resources;

use App\Contracts\ApiCacheContract;
use App\Models\Category;
use App\Models\Crypto;
use App\Models\EarnCategory;
use App\Models\Post;
use App\Services\Blog\ApiResource\CategoryApiResource;
use App\Services\Blog\ApiResource\PostApiResource;
use App\Services\Crypto\ApiResource\CoinResource;
use App\Services\Earn\ApiResource\EarnCategoryResource;
use App\Services\Earn\Enums\EarnStatus;
use Illuminate\Database\Eloquent\Relations\Relation;
use Spatie\LaravelData\CursorPaginatedDataCollection;
use Spatie\LaravelData\DataCollection;
use Spatie\LaravelData\PaginatedDataCollection;
use TiMacDonald\JsonApi\JsonApiResourceCollection;

final readonly class ApiHomeResource
{
    public function __construct(
      private ApiCacheContract $cache,
    ) {
    }

    public function generate(): mixed
    {
        return $this->cache->load_data(
          key: 'api_home_resource',
          callback: function () {
              return [
                'crypto' => $this->crypto(),
                'categories' => $this->categories()->toArray(),
                'earning_methods' => $this->earning_methods(),
                'latest_posts' => $this->latest_posts()->toArray(),
              ];
          }
        );
    }

    private function crypto(): JsonApiResourceCollection
    {
        $coins = Crypto::query()->where('data_name', 'all_coins')
          ->value('data_values')
          ->only(
            [
              'bitcoin', 'ethereum', 'binance-coin', 'solana', 'cardano',
              'ripple'
            ]
          )->sortBy('market_cap_rank');

        return CoinResource::collection(
          $coins
        );
    }

    private function categories(
    ): CursorPaginatedDataCollection|DataCollection|PaginatedDataCollection
    {
        $categories = Category::query()->whereIn('id', [1, 4, 7])
          ->get();

        return CategoryApiResource::collection(
          $categories
        );
    }

    private function earning_methods(): JsonApiResourceCollection
    {
        $earnCategory = EarnCategory::query()->whereIn('id', [1, 2, 7, 8])
          ->with([
            'earn' => function (Relation $query): void {
                $query->where('status', EarnStatus::FEATURED())
                  ->select(
                    [
                      'id', 'title', 'link', 'image_name', 'main_features',
                      'status',
                      'earn_category_id',
                    ]
                  )->get();
            },
          ])->get();

        return EarnCategoryResource::collection(
          $earnCategory
        );
    }

    private function latest_posts(
    ): CursorPaginatedDataCollection|DataCollection|PaginatedDataCollection
    {
        $latest_posts = Post::query()->with('tags')->latest('updated_at')->take(4)->get();

        return PostApiResource::collection(
          $latest_posts
        );
    }
}
