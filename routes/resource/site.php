<?php

declare(strict_types=1);

use App\Http\Controllers\Api\Site\HomeResourceController;
use Illuminate\Support\Facades\Route;

Route::get('/{site}', HomeResourceController::class)->name('home');
