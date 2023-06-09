<?php

declare(strict_types=1);

namespace App\Services\Crypto;

use App\Interfaces\Crypto\CryptoActionsInterface;
use App\Interfaces\Crypto\HandleCategoriesContract;
use App\Interfaces\Crypto\HandleCoinsContract;
use App\Interfaces\Crypto\HandleExchangesInterface;
use App\Models\Crypto;
use App\Services\Crypto\DataObjects\CryptoCategories;
use App\Services\Crypto\DataObjects\CryptoCoin;
use App\Services\Crypto\DataObjects\ExchangesData;
use Illuminate\Support\Collection;

final class CryptoActions implements CryptoActionsInterface
{
    public function __construct(
        private readonly CryptoService $service,
    ) {

    }

    /**
     * Update or Create Crypto Categories
     */
    public function updateOrCreateCategories(
        HandleCategoriesContract $action
    ): void {
        $action->handle(
            data_values: CryptoCategories::make(
                attributes: $this->service
                    ->crypto()
                    ->categories(),
            )
        );
    }

    /**
     * Update or Create Coins
     */
    public function updateOrCreateCoins(
        HandleCoinsContract $action
    ): void {
        $action->handle(
            responses: CryptoCoin::make(
                attributes: $this->service->crypto()->coins()
            ),
            data_name: 'all_coins',
        );

    }

    public function updateOrCreateCategory(
        HandleCoinsContract $action
    ): void {
        $state = settings()->get('category');
        $count = Crypto::ofCategories()->data_values->count();
        $categories = Crypto::ofCategories()->data_values->only([
            $state['from'], $state['from'] + 1, $state['to'],
        ]);
        $collect = $this->service->crypto()->coin_categories($categories, $count);
        $collect->each(function (Collection $item, string $key) use (
            $action
        ): void {
            $action->handle(
                responses: CryptoCoin::new(
                    collection: $item
                ),
                data_name: $key,
            );
        });
    }

    public function updateOrCreateExchanges(
        HandleExchangesInterface $action,
    ): void {
        $replace = $this->service->replace(
            items: $this->service->crypto()->exchanges(),
            replace: [
                'binance' => 'https://www.binance.com/en/activity/referral-entry/CPA?ref=CPA_004ILCS45B',
                'kucoin' => 'https://www.kucoin.com/r/rf/QBSAT41U',
            ]
        );
        $action->handle(
            responses: ExchangesData::make(
                collection: $replace,
            ),
        );
    }
}
