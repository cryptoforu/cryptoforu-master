<?php

declare(strict_types=1);

namespace App\Services\Api\Resources;

use App\Contracts\ApiCacheContract;
use App\Models\Category;
use App\Models\Page;
use App\Services\Api\DataObjects\BreadcrumbsData;

readonly class BreadCrumbsResource
{
  /**
   * BreadCrumbs Api Resource Instance
   * @param  ApiCacheContract  $cache
   */
  public function __construct(
    private ApiCacheContract $cache,
  ) {
  }

  /**
   * Generate Breadcrumbs resource
   * @return array
   */
  public function generate(): array
  {
    $data = [
      ...$this->pages(),
      ...$this->categories(),
    ];

    return $this->cache->load_data(
      key: 'breadcrumbs_data',
      callback: fn() => $data
    );
  }

  /**
   * Get Pages data
   * @return array
   */
  private function pages(): array
  {
    $pages = Page::query()
      ->where('page_type', 'front')
      ->with('parents')
      ->get();

    return BreadcrumbsData::collection($pages)->toArray();
  }

  /**
   * Get Categories Data
   * @return array
   */
  private function categories(): array
  {
    return Category::query()->get()->map(function ($category) {
      return BreadcrumbsData::from([
        'label' => $category->name,
        'route' => $category->category_links['category_link'],
        'meta_desc' => $category->description,
        'parents' => BreadcrumbsData::from([
          'label' => 'Learn Crypto',
          'route' => '/learn-crypto',
          'meta_desc' => 'Explore our crypto academy and learn everything you need to know about blockchain technology. We cover everything from the basics of blockchain technology to advanced strategies',
        ]),
      ]);
    })->toArray();

  }
}
