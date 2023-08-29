<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\FaucetPay;

use App\Http\Controllers\Controller;
use App\Models\FaucetList;
use App\Responses\CollectionResponse;
use Illuminate\Http\Request;

final class ListSearchController extends Controller
{
    /**
     * FaucetPay List Search Instance
     */
    public function __invoke(Request $request): CollectionResponse
    {
        $list = FaucetList::search(trim($request->get('q')) ?? '')
            ->query(function ($query): void {
                $query->join(
                    'list_category',
                    'list.listCategory',
                    'list_category.symbol'
                )
                    ->orderBy('list.paid_today', 'DESC')
                ;
            })
            ->get()
        ;

        return new CollectionResponse(
            data: $list
        );
    }
}
