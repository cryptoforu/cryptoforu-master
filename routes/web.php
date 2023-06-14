<?php

declare(strict_types=1);

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EarnController;
use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\SiteController;
use Illuminate\Http\Request;
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
Route::middleware('auth:sanctum')->prefix('admin')->as('admin:')->group(function (
): void {
  Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
  Route::prefix('settings')->as('settings:')->group(
    base_path('routes/admin/settings.php')
  );
  Route::prefix('blog')->as('blog:')->group(
    base_path('routes/admin/blog.php')
  );
  Route::prefix('library')->group(
    base_path('routes/admin/library.php')
  );
  Route::resource('earn', EarnController::class);
  Route::post(
    '/site/delete',
    [SiteController::class, 'delete']
  )->name('site.delete');
  Route::resource('site', SiteController::class);
  Route::get('/profile', ProfileController::class)->name('profile');
});
Route::post('/tokens/create', function (Request $request) {
  if ($request->user()->tokens()->where('name', $request->token_name)) {
    $request->user()->tokens()->where('name', $request->token_name)->delete();
  }
  $token = $request->user()->createToken(
    $request->token_name,
    ['admin,get-data']
  );

  return back()->with('token', $token->plainTextToken);
})->middleware('auth:sanctum');
