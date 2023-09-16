<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Crypto;

use App\Http\Controllers\Controller;
use App\Interfaces\Crypto\Contracts\CoinQueryContract;
use App\Models\CryptoCategories;
use App\Responses\CollectionResponse;
use App\Services\Crypto\DataObjects\CryptoCategoriesData;

final class CryptoCategoriesController extends Controller
{
    public function __construct(
        protected CoinQueryContract $coinQuery,
    ) {
    }

    /**
     * Get Coins By Category
     */
    public function __invoke(CryptoCategories $category): CollectionResponse
    {
        return new CollectionResponse(
            data: CryptoCategoriesData::fromModel(
                cryptoCategories: $category->load('coins')
            ),
        );
    }
}
