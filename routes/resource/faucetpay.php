<?php

declare(strict_types=1);

use App\Http\Controllers\Api\FaucetPay\ListController;
use App\Http\Controllers\Api\FaucetPay\ListSearchController;
use Illuminate\Support\Facades\Route;

Route::controller(ListController::class)->group(function (): void {
    Route::get(
        '/list/categories/{listCategory}',
        'index'
    )->name('list')->scopeBindings();
    Route::get('/list/categories', 'list_categories')->name('list_categories');
    Route::get('/list/stats', 'stats')->name('stats');
});
Route::get(
    '/search',
    ListSearchController::class
)->name('search');
