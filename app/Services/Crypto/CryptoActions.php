<?php

declare(strict_types=1);

namespace App\Services\Crypto;

use App\Interfaces\Crypto\CryptoActionsInterface;
use App\Interfaces\Crypto\HandleCategoriesContract;
use App\Interfaces\Crypto\HandleCoinsContract;
use App\Services\Crypto\DataObjects\CryptoCategories;
use App\Services\Crypto\DataObjects\CryptoCoin;

final class CryptoActions implements CryptoActionsInterface
{
    public function __construct(
        private readonly CryptoService $service,
        private readonly CryptoResource $resource,
    ) {

    }

    /**
     * Update or Create Crypto Categories
     *
     * @return void
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
     *
     * @return void
     */
    public function updateOrCreateCoins(
        HandleCoinsContract $action
    ): void {
        $action->handle(
            responses: CryptoCoin::make(
                attributes: $this->service->crypto()->coins()
            )
        );

    }
}
