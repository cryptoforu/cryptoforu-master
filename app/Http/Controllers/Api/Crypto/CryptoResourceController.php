<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Crypto;

use App\Http\Controllers\Controller;
use App\Interfaces\Crypto\Contracts\CoinQueryContract;
use App\Responses\CollectionResponse;
use App\Services\Crypto\DataObjects\CryptoCoin;
use App\Services\CryptoNews\CryptoNewsService;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class CryptoResourceController extends Controller
{
    public function __construct(
        protected CoinQueryContract $query,
        private readonly CryptoNewsService $news,
    ) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): void
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function popular(Request $request): CollectionResponse
    {
        $data = lazy_load()->load(
            key: 'crypto_popular',
            callback: fn () => (new Collection(
                items: [
                    'latest_news' => $this->news->decrypt_news()->take(3),
                    'popular' => CryptoCoin::popular($this->query->handle()->value('data_values')),
                ]
            ))
        );

        return new CollectionResponse(
            data: $data
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): void
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): void
    {

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): void
    {

    }
}
