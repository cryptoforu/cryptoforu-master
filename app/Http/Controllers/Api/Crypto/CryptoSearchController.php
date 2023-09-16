<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Crypto;

use App\Http\Controllers\Controller;
use App\Models\Coin;
use App\Responses\CollectionResponse;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class CryptoSearchController extends Controller
{
    /**
     * Search Coins
     */
    public function __invoke(Request $request): CollectionResponse
    {
        $coin = Coin::search(query: trim($request->get('q')) ?? '')
            ->query(function (Builder $query): void {
                $query->select([
                    'id', 'name', 'image', 'current_price',
                    'price_change_percentage_24h',
                    'market_cap_rank',
                    'price_change_percentage_1h_in_currency',
                    'price_change_percentage_24h_in_currency',
                    'price_change_percentage_7d_in_currency', 'market_cap',
                ])->orderBy('market_cap_rank')
                    ->orderBy('market_cap', 'desc')
                ;
            })->get()
        ;

        return new CollectionResponse(
            data: $coin
        );
    }
}
