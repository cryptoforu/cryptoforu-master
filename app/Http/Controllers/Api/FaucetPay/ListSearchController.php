<?php

namespace App\Http\Controllers\Api\FaucetPay;

use App\Http\Controllers\Controller;
use App\Models\FaucetPayList;
use App\Responses\CollectionResponse;
use Illuminate\Http\Request;

class ListSearchController extends Controller
{
  /**
   * @param  Request  $request
   * @return CollectionResponse
   */
  public function __invoke(Request $request): CollectionResponse
  {

    $lists = FaucetPayList::query()->select(['list_data'])->get()->flatten();
    $filtered = $lists->flatMap(function ($item) {
      return collect()->mergeRecursive($item['list_data']);
    })->filter(
      fn($item) => stripos($item['name'],
          $request->string('q')->trim()) !== false)
      ->all();
    return new CollectionResponse(
      data: $filtered
    );
  }
}
