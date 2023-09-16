<?php

declare(strict_types=1);

namespace App\Services\Site\Actions;

use App\Http\Requests\StoreSiteDataRequest;
use App\Interfaces\Library\LibraryActionsInterface;
use App\Models\Site;
use App\Services\Site\Concerns\Collectable;

final class UpdateSiteData
{
    use Collectable;

    public function __construct(
        private readonly LibraryActionsInterface $library,
    ) {

    }

    public function handle(
        StoreSiteDataRequest $request
    ): void {
        $query = Site::ofData($request->validated('data_name'));
        $validated = $request->validated();
        if ($request->hasFile('image')) {
            $image = $this->library->store(
                file: $request->file('image'),
                directory: 'misc'
            );
            $path = $image['file_name'];
            $this->library->save(
                model: $query,
                file: $image,
                category: 2,
            );
        }

        if (null !== $query) {
            $data = $this->collectable(
                attributes: $validated['data_values'],
                data_values: $query->data_values,
                image_path: $path ?? null,
            );
            if (isset($data['new_values'])) {
                $query->data_values[$data['key']] = $data['new_values'];
                cache()->flush();
                $query->save();
            }
        }
    }
}
