<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Earn;

use App\Contracts\ApiCacheContract;
use App\Http\Controllers\Controller;
use App\Interfaces\Earn\EarnCategoryQueryContract;
use App\Models\EarnCategory;
use App\Services\Earn\ApiResource\EarnCategoryApiData;
use Illuminate\Http\Request;
use Spatie\LaravelData\CursorPaginatedDataCollection;
use Spatie\LaravelData\DataCollection;
use Spatie\LaravelData\PaginatedDataCollection;

class EarnCategoryResourceController extends Controller
{
    public function __construct(
        private readonly EarnCategoryQueryContract $earn,
        private readonly ApiCacheContract $cache,
    ) {
    }

    /**
     * Handle the incoming request.
     */
    public function __invoke(
        Request $request
    ): CursorPaginatedDataCollection|DataCollection|PaginatedDataCollection {
        $data = $this->earn->handle(
            EarnCategory::query()->latest()
        )->get();

        return EarnCategoryApiData::collection(
            $data
        );
    }
}
