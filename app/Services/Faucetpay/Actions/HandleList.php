<?php

declare(strict_types=1);

namespace App\Services\Faucetpay\Actions;

use App\Interfaces\Faucetpay\HandleListContract;
use App\Models\FaucetList;
use Error;
use Illuminate\Support\Carbon;
use Illuminate\Support\LazyCollection;
use Illuminate\Support\Sleep;
use Spatie\Valuestore\Valuestore;

final class HandleList extends Valuestore implements HandleListContract
{
    public function handle(LazyCollection $collection): void
    {
        $waiting = true;
        while ($waiting) {
            try {
                $collection->each(
                    function ($item, $key): void {
                        $this->put($key, $item);
                    }
                );
            } catch (Error $exception) {
                $exception->getMessage();
            }
            Sleep::for(10)->seconds();
            $waiting = false;
        }
        while ( ! $waiting) {
            $top = FaucetList::query()->orderBy('health', 'desc')
                ->orderBy('paid_today', 'desc')
                ->orderBy('total_users_paid', 'desc')
                ->get()->unique('name')->take(100)->values()
            ;
            data_set($top, '*.listCategory', 'TOP');
            $new = FaucetList::query()->where(
                'creation_date',
                '>',
                Carbon::parse(now()->subMonth())
            )->get();
            data_set($new, '*.listCategory', 'NEW');
            $this->put('TOP', $top);
            $this->put('NEW', $new);
            $waiting = true;
        }
    }
}
