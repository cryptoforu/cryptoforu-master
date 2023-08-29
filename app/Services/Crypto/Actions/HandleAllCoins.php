<?php

declare(strict_types=1);

namespace App\Services\Crypto\Actions;

use App\Interfaces\Crypto\HandleCoinsContract;
use Illuminate\Support\Collection;
use Spatie\Valuestore\Valuestore;

final class HandleAllCoins extends Valuestore implements HandleCoinsContract
{
    public function handle(Collection $responses, string $data_name): bool
    {
        if ($this->has('all_coins') && 'all_coins' === $data_name) {
            $all = collect($this->get('all_coins'))->merge($responses);
            $this->put($data_name, $all);

            return true;
        }
        $this->put($data_name, $responses);

        return true;
    }
}
