<?php

declare(strict_types=1);

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EarnController;
use App\Http\Controllers\Admin\LibraryController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\Settings\AddSettingsController;
use App\Http\Controllers\Admin\Settings\UpdateMetaController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\SiteController;
use App\Http\Controllers\FrontEnd\ContactController;
use App\Http\Controllers\FrontEnd\CryptoController;
use App\Http\Controllers\FrontEnd\EarnCryptoController;
use App\Http\Controllers\FrontEnd\HomeController;
use App\Http\Controllers\FrontEnd\LearnCryptoController;
use Illuminate\Support\Facades\Route;
use Intervention\Image\Facades\Image;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
 */

Route::middleware('optimizeImages')->group(function (): void {
    Route::get('/', HomeController::class)->name('home');
    Route::controller(EarnCryptoController::class)->prefix('earn-crypto')->group(function (): void {
        Route::get('/', 'index')->name('earn-crypto');
        Route::get('/list', 'list')->name('faucets-lists');
    });
    Route::controller(LearnCryptoController::class)->prefix('learn-crypto')->group(function (): void {
        Route::get('/', 'index')->name('learn-crypto');
    });
    Route::controller(CryptoController::class)->prefix('crypto')->group(function (): void {
        Route::get('/', 'index')->name('crypto');
        Route::get('/news', 'news')->name('crypto-news');
        Route::get('/markets', 'markets')->name('crypto-markets');
    });
    Route::get('/contact', [ContactController::class, 'index'])->name('contact');
});
Route::get('/placeholder/{width}/{height}', function (int $width = 1200, int $height = 800) {
    return Image::cache(function ($image) use ($width, $height) {
        return $image->canvas(
            width: $width,
            height: $height,
            background: '#475569'
        );
    }, lifetime: 1048, returnObj: true)->response();
});
Route::middleware('auth:sanctum')->prefix('admin')->group(function (): void {
    Route::get('/', [DashboardController::class, 'index'])->name('admin.dashboard');
    Route::put('admin-settings/{page}', UpdateMetaController::class)->name('page.update');
    Route::post('admin-settings/create', AddSettingsController::class)->name('add.settings');
    Route::controller(SettingsController::class)->group(function (): void {
        Route::get('admin-settings', 'index')->name('admin-settings.index');
        Route::get('admin-settings/create', 'create')->name('admin-settings.create');
        Route::post('admin-settings/{action}', 'action')->name('admin-settings.action');
        Route::post('admin-settings', 'store')->name('admin-settings.store');
        Route::middleware('optimizeImages')->match(['put', 'patch'], 'admin-settings/menu/{admin_settings}', 'updateMenu')->name('admin-settings.menu');
        Route::delete('admin-settings/{admin_settings}', 'destroy')->name('admin-settings.destroy');
    });
    Route::post('admin-library/process', [LibraryController::class, 'process'])->name('admin-library.process');

    Route::prefix('admin-blog')->group(function (): void {
        Route::get('/', [PostController::class, 'index'])->name('admin-blog');
        Route::match(['put', 'patch'], '/{post}', [PostController::class, 'status'])->name('post.status');
        Route::get('/create', [PostController::class, 'create'])->name('admin-blog.create');
        Route::get('/create/category', [CategoryController::class, 'create'])->name('admin-blog.category.create');
        Route::middleware('optimizeImages')->post('/', [PostController::class, 'store'])->name('admin-blog.post.store');
        Route::get('/{post}/edit', [PostController::class, 'edit'])->name('admin-blog.edit');
        Route::middleware('optimizeImages')->match(['put', 'patch'], '/{post}/edit', [PostController::class, 'update'])->name('admin-blog.update');
        Route::delete('/{post}', [PostController::class, 'destroy'])->name('admin-blog.post.destroy');
        Route::resource('admin-categories', CategoryController::class)->only(['index', 'store', 'update', 'destroy'])
            ->parameters(
                [
                    'admin-categories' => 'category',
                ]
            );
    });
    Route::resource('admin-earn', EarnController::class)->parameters(
        [
            'admin-earn' => 'earn',
        ]
    );
    Route::delete('admin-library', [LibraryController::class, 'destroyMultiple'])->name('admin-library.destroyMultiple');
    Route::resource('admin-library', LibraryController::class)->parameters([
        'admin-library' => 'library',
    ]);
    Route::post('/site/delete', [SiteController::class, 'delete'])->name('site.delete');
    Route::resource('site', SiteController::class);
});
