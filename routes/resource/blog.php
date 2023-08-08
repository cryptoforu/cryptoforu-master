<?php

declare(strict_types=1);

use App\Http\Controllers\Api\Blog\BlogSearchController;
use App\Http\Controllers\Api\Blog\CategoryApiController;
use App\Http\Controllers\Api\Blog\PostsApiController;
use App\Http\Controllers\Api\Blog\StaticParamsController;
use App\Http\Controllers\Api\Blog\TagsController;
use Illuminate\Support\Facades\Route;

// Search

Route::get(
    '/search',
    BlogSearchController::class
)->name('search');

// Static Params

Route::get(
    '/generate',
    StaticParamsController::class
)
    ->name('generate')
;

// Categories
Route::get(
    '/categories',
    [CategoryApiController::class, 'index']
)->name('category');
Route::get(
    '/categories/{category}',
    [
        CategoryApiController::class, 'show',
    ]
)->name('categories');

// Posts

Route::get(
    '/posts',
    [
        PostsApiController::class,
        'index',
    ]
)->name('posts');
Route::get('/posts/category/{category}', [
    PostsApiController::class,
    'from_category',
])->name('from:category');
Route::get('/posts/{post}', [PostsApiController::class, 'show'])
    ->scopeBindings()->name('post')
;

// Tags

Route::get(
    '/tags',
    TagsController::class
)->name('tags');
