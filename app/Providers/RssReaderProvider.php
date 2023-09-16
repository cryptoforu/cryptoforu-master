<?php

declare(strict_types=1);

namespace App\Providers;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\ServiceProvider;

final class RssReaderProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {

    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Http::macro('read', function (string $url, ?array $query = null) {
            if ( ! filter_var($url, FILTER_VALIDATE_URL)) {
                return response()->json(
                    [
                        'message' => 'Invalid feed URL',
                    ],
                    400
                );
            }
            $response = Http::acceptJson()->get($url, $query);
            if ($response->successful()) {
                $rss = simplexml_load_string($response->body());
                if ($rss && $rss->channel) {
                    $json = json_encode($rss);
                    $array = json_decode($json, true);

                    return Arr::get($array, 'channel.item');
                }
            }

            return false;
        });
    }
}
