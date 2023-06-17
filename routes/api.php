<?php

declare(strict_types=1);

use App\Http\Controllers\Api\MetaDataController;
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
Route::get(
    '/placeholder/{width}/{height}',
    function (int $width = 1200, int $height = 800) {
        return Image::cache(function ($image) use ($width, $height) {
            return $image->canvas(
                width: $width,
                height: $height,
                background: '#475569'
            );
        }, lifetime: 1048, returnObj: true)->response();
    }
);
Route::get('/meta-data', MetaDataController::class);
Route::prefix('site')->as('site:')->group(
    base_path('routes/resource/site.php')
);
Route::prefix('blog')->as('blog:')->group(
    base_path('routes/resource/blog.php')
);
Route::prefix('crypto')->as('crypto:')->group(
    base_path('routes/resource/crypto.php')
);
