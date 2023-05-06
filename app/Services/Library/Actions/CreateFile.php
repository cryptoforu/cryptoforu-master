<?php

declare (strict_types = 1);

namespace App\Services\Library\Actions;

use App\Http\Requests\StoreLibraryRequest;
use App\Models\Library;
use App\Models\LibraryCategory;
use Illuminate\Database\Eloquent\Model;

class CreateFile
{
    public function handle(StoreLibraryRequest $request)
    {
        $store = new StoreFile();
        $files = $request->validated('file');
        if (!empty($files)) {
            foreach ($files as $file) {
                $category = LibraryCategory::find($request->validated('library_category_id'));
                $fl = $store->handle($file, $category->directory);
                Library::create([
                    'file_name' => $fl['file_name'],
                    'mime_type' => $fl['mime'],
                    'conversions' => $fl['conversions'],
                    'size' => $fl['size'],
                    'width' => $fl['width'],
                    'height' => $fl['height'],
                    'image_url' => $fl['path'],
                    'library_category_id' => $request->validated('library_category_id'),
                ]);
            }
            cache()->store('library')->clear();
            return true;

        }
        return false;
    }

    public function save(Model $model, array $file, int $category = 2)
    {
        $model->images()->create([
            'file_name' => $file['file_name'],
            'mime_type' => $file['mime'],
            'conversions' => $file['conversions'],
            'size' => $file['size'],
            'width' => $file['width'],
            'height' => $file['height'],
            'image_url' => $file['path'],
            'library_category_id' => $category,
        ]);
    }
}
