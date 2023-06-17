<?php

declare(strict_types=1);

namespace App\Services\Library\Actions;

use App\Services\Library\Concerns\Directories;
use App\Services\Library\Concerns\Responsive;
use Illuminate\Http\UploadedFile;
use Intervention\Image\Facades\Image;
use Throwable;

final class StoreFile
{
    use Directories;
    use Responsive;

    public function handle(UploadedFile $file, string $directory): array
    {
        $file_name = uniqid('', true) . '.' . $file->getClientOriginalExtension();
        $file_path = $this->directory($directory) . '/' . $file_name;
        $thumb_path = '/img/cache/sm/' . $file_name;
        $conversions = $this->responsive(
            file: $file,
            directory: $directory,
        );
        try {
            $fl = Image::make($file)->save(public_path($file_path));
        } catch (Throwable $e) {
            if ($e) {
                $fl = $file->store($file_path);
            }
        }
        $data = [
            'file_name' => $file_name,
            'path' => $file_path,
            'thumb' => $thumb_path,
            'conversions' => $conversions,
            'mime' => $fl->mime(),
            'size' => $fl->filesize(),
            'width' => $fl->width(),
            'height' => $fl->height(),
        ];

        return $data;
    }
}
