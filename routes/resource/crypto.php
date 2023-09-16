<?php

declare(strict_types=1);

use App\Http\Controllers\Api\Crypto\CryptoCategoriesController;
use App\Http\Controllers\Api\Crypto\CryptoResourceController;
use App\Http\Controllers\Api\Crypto\CryptoSearchController;
use Illuminate\Support\Facades\Route;

Route::get('/', [CryptoResourceController::class, 'index'])->name('index');
Route::get('/search', CryptoSearchController::class)->name('search');
Route::get(
    '/coins/{crypto}',
    [CryptoResourceController::class, 'show']
)->scopeBindings()->name('show');

Route::get(
    '/gainers-losers',
    [CryptoResourceController::class, 'gainers_losers']
)->name('gainers_losers');

// Categories
Route::get('/categories/{category}', CryptoCategoriesController::class)->name('categories');
