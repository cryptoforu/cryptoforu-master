<?php

declare(strict_types=1);

namespace App\Services\Faucetpay;

use App\Interfaces\Faucetpay\HandleListContract;
use App\Services\Api\DataObjects\DataTable;
use App\Services\Faucetpay\Actions\PaginateFaucets;
use App\Services\Faucetpay\DataFactory\FaucetDataFactory;
use App\Services\Faucetpay\DataObjects\FaucetListCategoryData;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\Pipeline;

final readonly class FaucetPayListResource
{
    public function __construct(
        private FaucetPayService $service,
        private PendingRequest $client
    ) {
    }

    public function make_list(
        HandleListContract $listContract,
    ): void {
        $factory = new FaucetDataFactory();
        $req = $this->service->getList(
            request: $this->client
        )['normal'];
        $listContract->handle(
            collection: $factory->collection(
                collection: collect($req)
            )
        );
    }

    public function getList(
        Builder|Collection|Model|null $query
    ): Collection|\Illuminate\Support\Collection {
        return DataTable::fromFaucets(
            faucets: Pipeline::send(
                passable: FaucetListCategoryData::from($query)->toArray()
            )->through([
                new PaginateFaucets(),
            ])->then(fn (
                \Illuminate\Support\Collection $collection
            ) => $collection)
        );
    }
}
