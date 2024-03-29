<?php

declare(strict_types=1);

use App\Http\Controllers\Api\ApiTestController;
use App\Http\Controllers\Api\Site\SharedPropsController;
use App\Services\Library\ImageFilters\Placeholder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Intervention\Image\Facades\Image;
use Tightenco\Ziggy\Ziggy;

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
  fn(Request $request) => $request->user()
);
Route::middleware([
  'json.response',
  'auth:sanctum',
  'ability:admin',
])->group(function (): void {
  Route::prefix('site')->as('site_')->group(
    base_path('routes/resource/site.php')
  );
  Route::prefix('blog')->as('blog_')->group(
    base_path('routes/resource/blog.php')
  );
  Route::prefix('crypto')->as('crypto_')->group(
    base_path('routes/resource/crypto.php')
  );
  Route::prefix('earn')->as('earn_')->group(
    base_path('routes/resource/earn.php')
  );
  Route::prefix('faucetpay')->as('faucetpay_')->group(
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

      return $img->filter(
        new Placeholder(
          width: $width,
          height: $height
        )
      );
    }, lifetime: 1048, returnObj: true)->response();
  }
)->name('placeholder');
Route::get('/count-views/{post}', [
  SharedPropsController::class,
  'count_views',
])->name('count_views');
Route::match(['GET', 'POST'],
  '/test',
  ApiTestController::class)->name('test');
Route::get('/ziggy', fn(Request $request) => response()->json(
  Cache::rememberForever('api-routes', fn() => new Ziggy(
    group: 'api',
    url: ''
  ))
))->name('ziggy');
