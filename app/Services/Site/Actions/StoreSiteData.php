<?php

declare(strict_types=1);

namespace App\Services\Site\Actions;

use App\Http\Requests\StoreSiteDataRequest;
use App\Interfaces\Library\LibraryActionsInterface;
use App\Interfaces\Site\StoreDataContract;
use App\Models\Site;
use App\Services\Site\Concerns\Collectable;

final class StoreSiteData implements StoreDataContract
{
  use Collectable;

  public function __construct(
    private readonly LibraryActionsInterface $library,
  ) {

  }

  /**
   * Store Data
   */
  public function handle(
    StoreSiteDataRequest $request
  ): void {

    $validated = $request->validated();

    $query = Site::query()->updateOrCreate([
      'data_name' => $validated['data_name'],

    ], ['data_values' => $validated['data_values']]);
    if ($request->hasFile('image')) {
      $image = $this->library->store(
        file: $request->file('image'),
        directory: 'misc'
      );
      $this->library->save(
        model: $query,
        file: $image,
        category: 2,
      );
    }

  }
}
