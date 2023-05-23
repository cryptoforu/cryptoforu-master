<?php

declare(strict_types=1);

namespace App\Services\Library\Actions;

use App\Interfaces\Library\LibraryDeleteContract;
use App\Models\Library;
use App\Services\Library\Concerns\Destroyable;
use App\Services\Library\DataObjects\LibDeleteData;
use Throwable;

final class DeleteFile implements LibraryDeleteContract
{
    use Destroyable;

    /**
     * Destroy File
     */
    public function handle(Library $library): bool
    {
        if ($library->exists) {
            $file = LibDeleteData::fromArray([
                'file_url' => $library->image_url,
                'file_conversions' => [
                    'lg' => $library->conversions['lg_path'],
                    'md' => $library->conversions['md_path'],
                    'sm' => $library->conversions['sm_path'],
                ],
            ]);
            try {
                $this->destroy(
                    file: $file,
                );
                session()->now('success', 'Destroyed File From Storage');
            } catch (Throwable $e) {
                report($e);
                session()->now('warning', 'Could not delete file');
            }
            $library->delete();
            cache()->store('library')->clear();

            return true;
        }

        return false;
    }
}
