<?php

declare(strict_types=1);

namespace App\Services\Library;

use App\Http\Requests\StoreLibraryRequest;
use App\Interfaces\Library\LibraryActionsInterface;
use App\Models\Library;
use App\Services\Library\Actions\CreateFile;
use App\Services\Library\Actions\DeleteFile;
use App\Services\Library\Actions\NewFile;
use App\Services\Library\Actions\StoreFile;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Intervention\Image\Image;

final class LibraryService implements LibraryActionsInterface
{
  public function __construct(
    private readonly StoreFile $store,
    private readonly DeleteFile $delete,
    private readonly NewFile $new,
    private readonly CreateFile $create,
  ) {
  }

  /**
   * Store File
   */
  public function store($file, string $directory): Image|array
  {
    return $this->store->handle(
      file: $file,
      directory: $directory
    );
  }

  /**
   * Destroy File
   */
  public function delete(Library $library): bool
  {
    if ($this->delete->handle(
      library: $library
    )) {
      Cache::flush();
      return true;
    }

    return false;
  }

  public function new(Model $model, array $file, int $category): bool
  {
    return $this->new->handle(
      model: $model,
      file: $file,
      category: $category
    );
  }

  /**
   * Save image from model
   */
  public function save(Model $model, array $file, int $category = 2): void
  {
    $this->create->save(
      model: $model,
      file: $file,
      category: $category,
    );
  }

  public function create(StoreLibraryRequest $request): void
  {
    $this->create->handle(
      request: $request
    );
  }
}
