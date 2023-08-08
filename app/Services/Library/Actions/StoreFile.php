<?php

declare(strict_types=1);

namespace App\Services\Library\Actions;

use App\Services\Library\Concerns\Directories;
use App\Services\Library\Concerns\Responsive;
use App\Services\Library\DataObjects\FileObject;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

final class StoreFile
{
    use Directories;
    use Responsive;

    public function handle(UploadedFile $file, string $directory): array
    {
        $file_name = $file->hashName();
        $path = $this->directory($directory);
        $uploaded = Storage::putFileAs($path, $file, $file_name);
        $conversions = $this->responsive(
            file: $file,
            directory: $directory,
        );
        $fl = Image::make($uploaded);

        return FileObject::from([
            'file_name' => $file_name,
            'mime_type' => $fl->mime(),
            'height' => $fl->height(),
            'width' => $fl->width(),
            'conversions' => $conversions,
            'image_url' => $uploaded,
            'size' => $fl->filesize(),
        ])->toArray();

    }
}
