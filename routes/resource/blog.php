<?php

declare(strict_types=1);

use App\Http\Controllers\Api\Blog\BlogSearchController;
use App\Http\Controllers\Api\Blog\CategoryApiController;
use App\Http\Controllers\Api\Blog\PostApiController;
use App\Http\Controllers\Api\Blog\TagsController;
use Illuminate\Support\Facades\Route;

// Search

Route::get(
  '/search',
  BlogSearchController::class
)->name('search');

// Blog

// Categories

Route::controller(
  CategoryApiController::class
)->prefix('category')->as('category_')->group(function () {
  Route::get('/', 'index')->name('index');
  Route::match(['GET', 'POST'], '/{category}', 'show')->name('show');
  Route::get('/{category}/related', 'related')->name('related');
})->scopeBindings();

// Posts

Route::controller(
  PostApiController::class
)->prefix('posts')->as('posts_')->group(function () {
  Route::get('/', 'index')->name('index');
  Route::get('/latest', 'latest')->name('latest');
  Route::get('/{post}', 'show')->name('show');
  Route::get('/{post}/related', 'related')->name('related');
})->scopeBindings();


// Tags

Route::get(
  '/tags',
  TagsController::class
)->name('tags');
