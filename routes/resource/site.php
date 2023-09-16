<?php

declare(strict_types=1);

use App\Http\Controllers\Api\Site\SharedPropsController;
use App\Http\Controllers\Api\Site\SiteResourceController;
use Illuminate\Support\Facades\Route;

Route::get('/{site}', SiteResourceController::class)->name('home');
Route::controller(SharedPropsController::class)->group(function (): void {
    Route::get('/shared/breadcrumbs', 'breadcrumbs')->name('breadcrumbs');
    Route::get('/shared/meta-data', 'meta_data')->name('meta_data');
});
