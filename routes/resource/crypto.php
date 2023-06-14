<?php

declare(strict_types=1);

use App\Http\Controllers\Api\Crypto\CryptoResourceController;
use Illuminate\Support\Facades\Route;

Route::get(
    '/popular',
    [CryptoResourceController::class, 'popular']
)->name('popular');
