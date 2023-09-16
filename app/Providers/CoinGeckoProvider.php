<?php

declare(strict_types=1);

namespace App\Providers;

use App\RateLimiters\RateLimiterStore;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\ServiceProvider;
use Spatie\GuzzleRateLimiterMiddleware\RateLimiterMiddleware;

final class CoinGeckoProvider extends ServiceProvider
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
        Http::macro('coingecko', function () {
            return Http::baseUrl(config('services.coingecko.base_url'))
                ->withMiddleware(
                    RateLimiterMiddleware::perMinute(
                        7,
                        new RateLimiterStore()
                    )
                )->throw()->acceptJson();
        });
    }
}
