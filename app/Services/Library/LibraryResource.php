<?php

declare(strict_types=1);

namespace App\Services\Library;

use App\Contracts\CacheStoreContract;
use App\Interfaces\Library\LibraryResourceInterface;
use App\Interfaces\Settings\PageInterface;
use App\Services\Library\Queries\ForCreate;
use App\Services\Library\Queries\ShowFiles;

class LibraryResource implements LibraryResourceInterface
{
    /**
     * Library Instance
     */
    public function __construct(
        private readonly CacheStoreContract $store,
        private readonly ShowFiles $show,
        private readonly PageInterface $page,
        private readonly ForCreate $create,
    ) {
    }

    /**
     * Library BAckend Index Page
     */
    public function forIndex(): array
    {
        $data = $this->show->handle();
        $meta = $this->store->load(
            key: 'libraryIndex',
            callback: [
                'meta' => $this->page->getPageMeta(
                    page_type: 'admin',
                    page: 'admin_library'
                ),
                'navigation' => $this->page->getAdminNavigation(),
                'select' => $data['select'],
            ],

        );

        return [
            ...$meta,
            ...$this->store->withInertia(
                collection: $data['data'],
            ),

        ];
    }

    /**
     * For Upload Page
     */
    public function forCreate(): array
    {
        return $this->store->load(
            key: 'libraryCreate',
            callback: [
                'meta' => $this->page->getPageMeta(
                    page_type: 'admin',
                    page: 'admin_library_upload',
                ),
                'navigation' => $this->page->getAdminNavigation(),
                'categories' => $this->create->handle(),
            ]
        );
    }
}
