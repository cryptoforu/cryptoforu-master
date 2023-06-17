<?php

declare(strict_types=1);

namespace App\Services\Library\Actions;

use App\Models\Library;
use Illuminate\Database\Eloquent\Model;

final class NewFile
{
    /**
     * Create New Model
     */
    public function handle(Model $model, array $file, int $category = 2): bool
    {
        $lib = Library::ofName($file['file_name'])->first();
        if (null !== $lib) {
            foreach ($file as $key => $value) {
                $lib->{$key} = $value;
            }
            $model->images()->save($lib);

            return true;
        }
        $new = new Library([
            'file_name' => $file['file_name'],
            'mime_type' => $file['mime'],
            'conversions' => $file['conversions'],
            'size' => $file['size'],
            'width' => $file['width'],
            'height' => $file['height'],
            'image_url' => $file['path'],
            'library_category_id' => $category,
        ]);
        $model->images()->save($new);

        return true;
    }
}
