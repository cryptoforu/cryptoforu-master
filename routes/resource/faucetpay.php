<?php

declare(strict_types=1);

use App\Http\Controllers\Api\FaucetPay\ListController;
use App\Http\Controllers\Api\FaucetPay\ListSearchController;
use Illuminate\Support\Facades\Route;

Route::get('/list', [ListController::class, 'index'])->name('list');
Route::get('/stats', [ListController::class, 'stats'])->name('stats');
Route::get(
    '/search',
    ListSearchController::class
)->name('search');
