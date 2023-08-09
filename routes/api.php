<?php

declare(strict_types=1);

use App\Http\Controllers\Api\BreadcrumbsController;
use App\Http\Controllers\Api\CountViewsController;
use App\Http\Controllers\Api\HomeResource;
use App\Http\Controllers\Api\MetaDataController;
use App\Http\Controllers\Api\NavigationDataController;
use App\Services\Library\ImageFilters\Placeholder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Intervention\Image\Facades\Image;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
 */

Route::middleware('auth:sanctum')->get(
    '/user',
    fn (Request $request) => $request->user()
);
Route::middleware([
    'json.response', 'auth:sanctum', 'ability:admin',
])->group(function (): void {
    Route::get('/meta-data', MetaDataController::class);
    Route::get(
        '/navigation-data',
        NavigationDataController::class
    );
    Route::get(
        '/home_resource',
        HomeResource::class
    )->name('home:resource');
    Route::get(
        'breadcrumbs',
        BreadcrumbsController::class
    )
        ->name('crumbs')
    ;
    Route::get(
        '/count/{post}',
        CountViewsController::class
    )->name('count');
    Route::prefix('site')->as('site:')->group(
        base_path('routes/resource/site.php')
    );
    Route::prefix('blog')->as('blog:')->group(
        base_path('routes/resource/blog.php')
    );
    Route::prefix('crypto')->as('crypto:')->group(
        base_path('routes/resource/crypto.php')
    );
    Route::prefix('earn')->as('earn:')->group(
        base_path('routes/resource/earn.php')
    );
    Route::prefix('faucetpay')->as('faucetpay:')->group(
        base_path('routes/resource/faucetpay.php')
    );
});
Route::get(
    '/placeholder/{width}/{height}',
    static function (int $width = 1200, int $height = 800) {
        return Image::cache(static function ($image) use ($width, $height) {
            $img = $image->canvas(
                width: $width,
                height: $height,
                background: '#111827'
            );

            return $img->filter(new Placeholder(
                width: $width,
                height: $height
            ));
        }, lifetime: 1048, returnObj: true)->response();
    }
);
