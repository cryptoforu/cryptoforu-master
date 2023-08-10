<?php

namespace App\Http\Controllers\Api\Site;

use App\Contracts\ApiServiceContract;
use App\Http\Controllers\Controller;
use App\Interfaces\Settings\GetMenuContract;
use App\Models\Post;
use App\Responses\CollectionResponse;
use App\Responses\JsonResponse;
use Illuminate\Http\Request;

final class SharedPropsController extends Controller
{
  /**
   * @param  ApiServiceContract  $service
   * @param  GetMenuContract  $menuContract
   */
  public function __construct(
    protected ApiServiceContract $service,
    protected GetMenuContract $menuContract,
  ) {
  }

  /**
   * Get Page Meta Data
   * @return CollectionResponse
   */
  public function meta_data(): CollectionResponse
  {
    return new CollectionResponse(
      data: $this->service->meta()->get_meta_data()
    );
  }

  /**
   * Get Pages Breadcrumbs
   * @return CollectionResponse
   */
  public function breadcrumbs(): CollectionResponse
  {
    return new CollectionResponse(
      data: $this->service->breadcrumbs()->generate()
    );
  }

  /**
   * Posts View Count
   * @param  Request  $request
   * @param  Post  $post
   * @return JsonResponse
   */
  public function count_views(Request $request, Post $post): JsonResponse
  {
    return new JsonResponse(
      data: $this->service->post_count(
        post: $post,
        ip: $request->ip()
      )
    );
  }

  /**
   * Home Page Data
   * @return CollectionResponse
   */
  public function home_resource(): CollectionResponse
  {
    return new CollectionResponse(
      data: $this->service->home()->generate()
    );
  }

  /**
   * Get Main Menu
   * @return JsonResponse
   */
  public function front_menu(): JsonResponse
  {
    return new JsonResponse(
      data: $this->service->menu(
        menuContract: $this->menuContract
      )->get_front_menu()
    );
  }
}
