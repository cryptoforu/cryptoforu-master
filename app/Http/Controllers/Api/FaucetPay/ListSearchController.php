<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\FaucetPay;

use App\Http\Controllers\Controller;
use App\Models\FaucetPayList;
use App\Responses\CollectionResponse;
use Illuminate\Http\Request;

final class ListSearchController extends Controller
{
    /**
     * FaucetPay List Search Instance
     */
    public function __invoke(Request $request): CollectionResponse
    {

        $lists = FaucetPayList::query()->select(['list_data'])->get()->flatten();
        $filtered = $lists->flatMap(fn (
            $item
        ) => collect()->mergeRecursive($item['list_data']))->filter(
            fn ($item) => false !== mb_stripos(
                $item['name'],
                $request->string('q')->trim()
            )
        )
            ->all()
        ;

        return new CollectionResponse(
            data: $filtered
        );
    }
}
