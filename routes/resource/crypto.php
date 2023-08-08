<?php

declare(strict_types=1);

use App\Http\Controllers\Api\Crypto\CryptoResourceController;
use Illuminate\Support\Facades\Route;

Route::get('/', [CryptoResourceController::class, 'index'])->name('index');
Route::get(
    '/coins/{crypto}',
    [CryptoResourceController::class, 'show']
)->scopeBindings()->name('show');
