<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Site;

use App\Http\Controllers\Controller;
use App\Models\Site;
use App\Responses\CollectionResponse;
use App\Services\Site\ApiResource\HomeResource;
use Illuminate\Http\Request;

class HomeResourceController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Site $site): CollectionResponse
    {
        return new CollectionResponse(
            data: lazy_load()->load(
                key: $request->query('fields[sites]') ?? $site->data_name,
                callback: fn () => HomeResource::make($site),
            )
        );
    }
}
