<?php

namespace App\Http\Controllers\Api\FaucetPay;

use App\Http\Controllers\Controller;
use App\Interfaces\Faucetpay\FaucetPayServiceInterface;
use App\Interfaces\Faucetpay\GetFaucetsStatsContract;
use App\Interfaces\Faucetpay\ListUpdateOrCreateContract;
use App\Models\FaucetPayList;
use App\Responses\CollectionResponse;
use App\Services\Faucetpay\DataObjects\FaucetListData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class ListController extends Controller
{

  /**
   * @param  FaucetPayServiceInterface  $service
   * @param  ListUpdateOrCreateContract  $list
   * @param  GetFaucetsStatsContract  $stats
   */
  public function __construct(
    protected FaucetPayServiceInterface $service,
    protected ListUpdateOrCreateContract $list,
    protected GetFaucetsStatsContract $stats,
  ) {
  }


  /**
   * Handle the incoming request.
   */
  public function index(Request $request)
  {
    $query = QueryBuilder::for(FaucetPayList::class)
      ->allowedFilters([
        AllowedFilter::exact('list_name'),
        AllowedFilter::exact('currency')
      ])->get();

    return $query
      ->flatMap(
        fn($item) => FaucetListData::fromData($item)
      );
  }

  /**
   * @return CollectionResponse
   */
  public function stats(): CollectionResponse
  {
    $data = Cache::tags(['faucet-list', 'stats'])->remember('faucet-stats',
      now()->addDay(), function () {
        return $this->stats->handle();
      });
    return new CollectionResponse(
      data: $data
    );
  }

}
