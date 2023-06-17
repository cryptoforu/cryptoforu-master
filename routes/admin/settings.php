<?php

declare(strict_types=1);

use App\Http\Controllers\Admin\Settings\AddSettingsController;
use App\Http\Controllers\Admin\Settings\UpdateMetaController;
use App\Http\Controllers\Admin\SettingsController;
use Illuminate\Support\Facades\Route;

Route::controller(SettingsController::class)->group(function (): void {
    Route::get('/', 'index')->name('index');
    Route::get('/create', 'create')->name('create');
    Route::post('/{action}', 'action')->name('action');
    Route::post('/', 'store')->name('store');
    Route::middleware('optimizeImages')->match(
        ['put', 'patch'],
        '/menu/{admin_settings}',
        'updateMenu'
    )->name('menu');
    Route::delete(
        '/{admin_settings}',
        'destroy'
    )->name('destroy');
});
Route::put(
    '/{page}',
    UpdateMetaController::class
)->name('page.update');
Route::post(
    '/create',
    AddSettingsController::class
)->name('add.settings');
