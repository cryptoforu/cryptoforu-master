<?php

declare(strict_types=1);

namespace App\Services\Library\Actions;

use App\Http\Requests\UpdateLibraryRequest;
use App\Interfaces\Library\LibraryDeleteContract;
use App\Interfaces\Library\LibraryUpdateContract;
use App\Models\Library;

class UpdateFile implements LibraryUpdateContract
{
    public function __construct(
        private LibraryDeleteContract $delete,
    ) {
    }

    public function handle(UpdateLibraryRequest $request, Library $library): bool
    {
        $store = new StoreFile();
        $uploaded = $request->validated();
        $deleted = $this->delete->handle(
            library: $library,
            destroy: false,
        );
        if ($deleted) {
            $file = $store->handle(
                $uploaded['file'],
                $library->libraryCategory()->value('directory')
            );
            $library->update([
                'file_name' => $file['file_name'],
                'mime_type' => $file['mime'],
                'conversions' => $file['conversions'],
                'size' => $file['size'],
                'width' => $file['width'],
                'height' => $file['height'],
                'image_url' => $file['path'],
            ]);
            cache()->flush();

            return true;
        }

        return false;
    }
}
