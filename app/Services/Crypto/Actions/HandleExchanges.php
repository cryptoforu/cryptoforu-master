<?php

declare(strict_types=1);

namespace App\Services\Crypto\Actions;

use App\Interfaces\Crypto\HandleExchangesInterface;
use Cerbero\JsonParser\JsonParser;
use Spatie\Valuestore\Valuestore;

final class HandleExchanges extends Valuestore implements HandleExchangesInterface
{
    // TO DO
    // Store Urls To Replace In Database and create programmatic functions
    protected array $replaceArr = [
        'binance' => 'https://www.binance.com/en/activity/referral-entry/CPA?ref=CPA_004ILCS45B',
        'kucoin' => 'https://www.kucoin.com/r/rf/QBSAT41U',
    ];

    public function handle(JsonParser $responses): bool
    {
        $responses->traverse(function (
            mixed $value,
        ): void {
            $site = $this->replaceUrls($value['id']);
            if ($site) {
                $value['url'] = $site;
            }
            $this->put($value['id'], $value);
        });

        return true;
    }

    /**
     * @return false|mixed|string
     */
    private function replaceUrls(string $id): mixed
    {
        foreach ($this->replaceArr as $a) {
            if (array_key_exists($id, $this->replaceArr)) {
                return $a;
            }
        }

        return false;
    }
}
