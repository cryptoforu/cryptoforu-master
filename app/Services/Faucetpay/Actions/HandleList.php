<?php

declare(strict_types=1);

namespace App\Services\Faucetpay\Actions;

use App\Interfaces\Faucetpay\HandleListContract;
use App\Models\FaucetList;
use Cerbero\JsonParser\JsonParser;
use Error;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\LazyCollection;
use Illuminate\Support\Sleep;
use Spatie\Valuestore\Valuestore;

final class HandleList extends Valuestore implements HandleListContract
{
    public function handle(LazyCollection $collection): void
    {
        $waiting = true;
        $cache = false;
        while ($waiting) {
            try {
                $collection->each(
                    function ($item, $key): void {
                        $arr = $this->check_arr(
                            attributes: $item,
                            key: $key
                        );
                        $this->put($key, $arr);
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
                ->get()->unique('name')->take(100)->values();
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
            $cache = true;
        }
        while ($cache) {
            $this->to_cache();
            $cache = false;
        }
    }

    private function check_arr(array $attributes, string $key)
    {
        if ($this->has($key)) {
            $current = collect($this->get($key))->keyBy('id');
            $collect = collect($attributes)->keyBy('id');

            return $current->merge($collect)->values()->all();
        }

        return $attributes;
    }

    private function to_cache(): void
    {
        $collection = collect();
        $json = JsonParser::parse(storage_path('app/list/list_data.json'));
        foreach ($json as $key => $value) {
            $collection->push(...$value);
        }
        Cache::put('faucet_list', $collection->toArray(), now()->addMinutes(20));
    }
}
