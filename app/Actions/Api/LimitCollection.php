<?php

declare(strict_types=1);

namespace App\Actions\Api;

use Illuminate\Database\Eloquent\Collection as ECollection;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Request;

class LimitCollection
{
    public function __invoke(
        Collection|ECollection $collection
    ): Collection|ECollection {
        return Request::whenHas(
            'limit',
            static function () use ($collection) {
                return $collection->take(
                    limit: Request::query('limit')
                );
            },
            static fn () => $collection
        );
    }
}
