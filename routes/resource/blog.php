<?php

declare(strict_types=1);

use App\Http\Controllers\Api\Blog\CategoryResourceController;
use Illuminate\Support\Facades\Route;

Route::get(
    '/categories',
    [CategoryResourceController::class, 'index']
)->name('category');
