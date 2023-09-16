<?php

declare(strict_types=1);

namespace App\Services\Crypto;

use App\Interfaces\Crypto\CryptoActionsInterface;
use App\Interfaces\Crypto\HandleCategoriesContract;
use App\Interfaces\Crypto\HandleCoinsContract;
use App\Interfaces\Crypto\HandleExchangesInterface;
use App\Models\CryptoCategories;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Http\Client\RequestException;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Collection;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;
use Throwable;

final readonly class CryptoActions implements CryptoActionsInterface
{
    /**
     * Crypto Service Instance
     */
    public function __construct(
        private CryptoService $service,
    ) {
    }

    /**
     * Handle Top Coins
     *
     * @throws ContainerExceptionInterface
     * @throws NotFoundExceptionInterface
     */
    public function handleTopCoins(
        HandleCoinsContract $action,
    ): Collection {
        return $this->service->crypto()->coins()
            ->each(function (Response $item) use (
                $action
            ): void {
                try {
                    $action->handle(
                        responses: $item,
                        data_name: 'top-coins'
                    );
                } catch (Throwable $e) {
                    $e->getMessage();
                }
            });
    }

    /**
     * Update or Create Crypto Categories
     *
     * @throws RequestException
     */
    public function updateOrCreateCategories(
        HandleCategoriesContract $action,
    ): void {
        $action->handle(
            collection: $this->service
                ->crypto()
                ->categories()
        );
    }

    /**
     * @throws ContainerExceptionInterface
     * @throws NotFoundExceptionInterface
     */
    public function updateOrCreateCategory(
        HandleCoinsContract $action,
    ): Collection {
        $query = $this->getQuery();

        return $this->service->crypto()->coin_categories(
            collection: $query,
        )->each(function (Response $item, string $key) use (
            $action
        ): void {
            try {
                $action->handle(
                    responses: $item,
                    data_name: $key,
                );
            } catch (Throwable $e) {
                $e->getMessage();
            }
        });
    }

    /**
     * @throws RequestException
     */
    public function updateOrCreateExchanges(
        HandleExchangesInterface $action,
    ): void {
        $action->handle(
            responses: $this->service->crypto()->exchanges()
        );
    }

    /**
     * @throws RequestException
     */
    public function fp_coins(
        HandleCoinsContract $action,
    ): void {
        $response = $this->service->crypto()
            ->price(
                coin: 'bitcoin,ethereum,dogecoin,litecoin,bitcoin-cash,dash,
                digibyte,tron,tether,feyorra,zcash,binancecoin,solana,
                ripple,matic-network,cardano'
            );
        try {
            $action->handle(
                responses: $response,
                data_name: 'fp_coins'
            );
        } catch (Throwable $e) {
            $e->getMessage();
        }
    }

    /**
     * @throws ContainerExceptionInterface
     * @throws NotFoundExceptionInterface
     */
    private function getQuery(): EloquentCollection|array
    {
        $state = $this->service->set_state(
            key: 'category',
            by: 1,
            max: 51
        );

        return CryptoCategories::query()
            ->get()->forPage(
                $state['from'],
                3
            );
    }
}
