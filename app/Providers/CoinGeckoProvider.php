<?php

namespace App\Providers;

use App\RateLimiters\RateLimiterStore;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\ServiceProvider;
use Spatie\GuzzleRateLimiterMiddleware\RateLimiterMiddleware;

class CoinGeckoProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Http::macro('coingecko', function () {
            return Http::baseUrl(config('services.coingecko.base_url'))
                ->timeout(config('services.coingecko.timeout', 10))
                ->connectTimeout(config('services.coingecko.connect_timeout', 2))
                ->withMiddleware(RateLimiterMiddleware::perMinute(5, new RateLimiterStore))
                ->acceptJson();
        });
    }
}
