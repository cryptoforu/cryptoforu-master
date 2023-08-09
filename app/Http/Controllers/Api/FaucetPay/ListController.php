<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\FaucetPay;

use App\Http\Controllers\Controller;
use App\Interfaces\Faucetpay\FaucetPayServiceInterface;
use App\Interfaces\Faucetpay\GetFaucetsStatsContract;
use App\Interfaces\Faucetpay\ListUpdateOrCreateContract;
use App\Models\FaucetPayList;
use App\Responses\CollectionResponse;
use App\Services\Faucetpay\DataObjects\FaucetListData;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

final class ListController extends Controller
{
  /**
   * FaucetPay List Instance
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
   * FaucetPay List Query Builder
   * @return Collection
   */
  public function index(): Collection
  {
    $query = QueryBuilder::for(FaucetPayList::class)
      ->allowedFilters([
        AllowedFilter::exact('list_name'),
        AllowedFilter::exact('currency'),
      ])->get();

    return $query
      ->flatMap(
        fn($item) => FaucetListData::fromData($item)
      );
  }

  /**
   * FaucetPay List Statistics Api
   * @return CollectionResponse
   */
  public function stats(): CollectionResponse
  {
    $data = Cache::tags(['faucet-list', 'stats'])->remember(
      'faucet-stats',
      now()->addDay(),
      fn() => $this->stats->handle()
    );

    return new CollectionResponse(
      data: $data
    );
  }
}
