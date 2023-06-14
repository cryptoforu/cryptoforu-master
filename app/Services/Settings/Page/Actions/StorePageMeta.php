<?php

declare(strict_types=1);

namespace App\Services\Settings\Page\Actions;

use App\Http\Requests\StorePageRequest;
use App\Interfaces\Library\LibraryActionsInterface;
use App\Models\Page;

final class StorePageMeta
{
    public function __construct(
        private readonly LibraryActionsInterface $library,
    ) {
    }

    public function handle(StorePageRequest $from): void
    {
        $validated = $from->validated();

        $image_paths = (string) (config('app.url') . '/img/cache/original/6453f5dad4e11.png');

        if ($from->hasFile('meta_image')) {
            $meta_image = $this->library->store(
                file: $validated['meta_image'],
                directory: 'meta'
            );
            $meta_path = (string) (config('app.url') . '/' . $meta_image['path']);
        }
        if ($from->hasFile('tw_image')) {
            $tw_image = $this->library->store(
                file: $validated['tw_image'],
                directory: 'meta'
            );
            $tw_path = (string) (config('app.url') . '/' . $tw_image['path']);
        }
        if ($from->hasFile('og_image')) {
            $og_image = $this->library->store(
                file: $validated['og_image'],
                directory: 'meta'
            );
            $og_path = (string) (config('app.url') . '/' . $og_image['path']);
        }

        $page = Page::create([
            'label' => $validated['label'],
            'route' => $validated['route'],
            'meta_desc' => $validated['meta_desc'],
            'meta_image' => $meta_path ?? $image_paths,
            'tw_image' => $tw_path ?? $image_paths,
            'og_image' => $og_path ?? $image_paths,
            'parent_id' => $validated['parent_id'],
            'page_type' => $validated['page_type'],
            'page_name' => $validated['page_name'],
        ]);
        if ( ! empty($from->allFiles())) {
            collect([$meta_image, $tw_image, $og_image])
                ->map(fn ($img) => $this->library->save(
                    model: $page,
                    file: $img,
                    category: 8
                ))
            ;
        }

    }
}
