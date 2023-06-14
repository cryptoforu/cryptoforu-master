<?php

declare(strict_types=1);

namespace App\Providers;

use App\Services\CryptoNews\CoinStatsResource;
use App\Services\CryptoNews\CryptoNewsService;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\ServiceProvider;

class CryptoNewsProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $coinstats = Http::withOptions([
            'base_uri' => config('services.coinstats.base_url'),
        ])->acceptJson();
        $this->app->when(
            concrete: CoinStatsResource::class,
        )->needs(
            abstract: PendingRequest::class,
        )->give(fn () => $coinstats);

        $this->app->when(
            concrete: CryptoNewsService::class,
        )->needs('$decrypt')
            ->giveConfig('services.descrypt.base_url')
        ;
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {

    }
}
