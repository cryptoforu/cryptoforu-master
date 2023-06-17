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
    public function handle(Library $library, bool $destroy = true): bool
    {
        if ($library->exists) {
            $file = LibDeleteData::fromArray([
                'file_url' => $library->image_url,
                'file_conversions' => [
                    'lg' => $library->conversions['lg_path'] ?? $library->conversions['lg'],
                    'md' => $library->conversions['md_path'] ?? $library->conversions['md'],
                    'sm' => $library->conversions['sm_path'] ?? $library->conversions['sm'],
                ],
            ]);
            try {
                $this->destroy(
                    file: $file,
                );
                session(['success', 'Destroyed File From Storage']);
            } catch (Throwable $e) {
                report($e);
                session(['warning', 'Could not delete file']);
            }
            if (true === $destroy) {
                $library->delete();
            }

            cache()->flush();

            return true;
        }

        return false;
    }
}
