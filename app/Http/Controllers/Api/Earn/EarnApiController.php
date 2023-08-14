<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Earn;

use App\Http\Controllers\Controller;
use App\Interfaces\Earn\EarnQueryContract;
use App\Models\Earn;
use App\Services\Earn\ApiResource\EarnApiResource;
use Illuminate\Http\Request;

final class EarnApiController extends Controller
{
    /**
     * Earning Methods Instance
     */
    public function __construct(
        protected EarnQueryContract $queryContract,
    ) {
    }

    /**
     * Earning Methods Query Builder
     */
    public function __invoke(
        Request $request
    ): array {
        $earnData = $this->queryContract->handle(
            query: Earn::query()->latest()
        )->get();

        return $earnData->map(static fn (
            $item
        ) => EarnApiResource::fromModel($item))->toArray();

    }
}
