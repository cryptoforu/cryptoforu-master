<?php

declare(strict_types=1);

namespace App\Services\Library\Actions;

use App\Http\Requests\StoreLibraryRequest;
use App\Models\Library;
use App\Models\LibraryCategory;
use Illuminate\Database\Eloquent\Model;

final class CreateFile
{
  public function handle(StoreLibraryRequest $request): bool
  {
    $store = new StoreFile();
    $files = $request->validated('file');
    if (!empty($files)) {
      foreach ($files as $file) {
        $category = LibraryCategory::query()->find($request->validated('library_category_id'));
        $fl = $store->handle($file, $category->directory);
        Library::query()->create([
          'file_name' => $fl['file_name'],
          'mime_type' => $fl['mime_type'],
          'conversions' => $fl['conversions'],
          'size' => $fl['size'],
          'width' => $fl['width'],
          'height' => $fl['height'],
          'image_url' => $fl['image_url'],
          'library_category_id' => $request->validated('library_category_id'),
        ]);
      }
      cache()->flush();

      return true;

    }

    return false;
  }

  public function save(Model $model, array $file, int $category = 2): void
  {

    $model->images()->create([
      'file_name' => $file['file_name'],
      'mime_type' => $file['mime_type'],
      'conversions' => $file['conversions'],
      'size' => $file['size'],
      'width' => $file['width'],
      'height' => $file['height'],
      'image_url' => $file['image_url'],
      'library_category_id' => $category,
    ]);


  }
}
