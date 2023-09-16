<?php

declare(strict_types=1);

namespace App\Services\Library\Concerns;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

trait Cleanable
{
  public function clean(string|array $file): bool
  {
    $files = Storage::allFiles(public_path('images'));
    if (is_array($file)) {
      Arr::map($file, function ($value) use ($files) {
        if (Str::of($value)->startsWith('images/')) {
          Storage::delete($value);

          return true;
        }
        $f = Arr::get($files, "*.$value");
        if (!empty($f)) {
          Storage::delete($f);

          return true;
        }

        return false;
      });
    } else {
      if (Str::of($file)->startsWith('images/')) {
        Storage::delete($file);

        return true;
      }
      $f = Arr::get($files, "*.$file");
      if (!empty($f)) {
        Storage::delete($f);
      }

      return false;
    }

    return false;
  }
}
