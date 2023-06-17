<?php

declare(strict_types=1);

use App\Http\Controllers\Admin\LibraryController;
use Illuminate\Support\Facades\Route;

Route::controller(LibraryController::class)->group(function (): void {
    Route::post('/', 'process')->name('library.process');
    Route::delete('/', 'destroyMultiple')->name('library.destroyMultiple');

});
Route::resource('library', LibraryController::class);
