<?php

declare(strict_types=1);

namespace App\Services\Crypto\Actions;

use App\Interfaces\Crypto\HandleCoinsContract;
use App\Services\Crypto\DataObjects\CryptoCoin;
use Cerbero\JsonParser\JsonParser;
use Illuminate\Http\Client\Response;
use Spatie\Valuestore\Valuestore;

final class HandleAllCoins extends Valuestore implements HandleCoinsContract
{
    public function handle(Response|array $responses, string $data_name): bool
    {
        $collect = collect();
        $json = JsonParser::parse($responses);
        foreach ($json as $key => $value) {

            $collect->put($key, $value);
        }
        $data = CryptoCoin::collection(
            items: $collect->map(
                fn ($item) => CryptoCoin::from($item)
                    ->additional(['category' => $data_name])
            )
        )->toArray();
        $arr = $this->check_arr(
            attributes: $data,
            key: $data_name
        );
        $this->put($data_name, $arr);

        return true;
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
}
