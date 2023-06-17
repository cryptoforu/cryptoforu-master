<?php

declare(strict_types=1);

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\PostController;
use Illuminate\Support\Facades\Route;

Route::match(
    ['put', 'patch'],
    '/{post}',
    [PostController::class, 'status']
)->name('status');
Route::resource('post', PostController::class);
Route::resource(
    'category',
    CategoryController::class
);
