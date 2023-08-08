<?php

declare(strict_types=1);

use App\Http\Controllers\Api\Earn\EarnApiController;
use App\Http\Controllers\Api\Earn\EarnCategoryResourceController;
use Illuminate\Support\Facades\Route;

// Earn Categories

Route::get(
    '/earn_categories',
    EarnCategoryResourceController::class
)->name('earn_categories');

// Earning Methods

Route::get(
    '/earn-methods',
    EarnApiController::class
)->name('earn_data');
