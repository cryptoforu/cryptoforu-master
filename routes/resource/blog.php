<?php

declare(strict_types=1);

use App\Http\Controllers\Api\Blog\BlogApiController;
use App\Http\Controllers\Api\Blog\BlogSearchController;
use App\Http\Controllers\Api\Blog\TagsController;
use Illuminate\Support\Facades\Route;

// Search

Route::get(
  '/search',
  BlogSearchController::class
)->name('search');

// Blog

Route::controller(BlogApiController::class)->group(
  function (): void {
    Route::get('/', 'index')->name('index');
    Route::get('/latest', 'latest')->name('latest');
    Route::match(['GET', 'POST'], '/{category}/posts', 'category')->name(
      'category'
    );
    Route::get('/{category}/posts/{post}', 'post')->name('post');
  }
)->scopeBindings();

// Tags

Route::get(
  '/tags',
  TagsController::class
)->name('tags');
