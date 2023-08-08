<?php

declare(strict_types=1);

namespace App\Services\Library;

use App\Contracts\CacheContract;
use App\Interfaces\Library\LibraryResourceInterface;
use App\Interfaces\Settings\PageInterface;
use App\Services\Library\Queries\ForCreate;
use App\Services\Library\Queries\ShowFiles;

final class LibraryResource implements LibraryResourceInterface
{
    /**
     * Library Instance
     */
    public function __construct(
        private readonly ShowFiles $show,
        private readonly PageInterface $page,
        private readonly ForCreate $create,
        private readonly CacheContract $cache,
    ) {
    }

    /**
     * Library BAckend Index Page
     */
    public function forIndex(): array
    {
        $data = $this->show->handle();
        $meta = $this->cache->load(
            key: 'admin:library_data',
            callback: fn () => array_merge([
                ...$this->page->admin_meta(),
                'select' => $data['select'],
            ]),
        );

        return [
            ...$meta,
            ...$this->cache->withInertia(
                collection: $data['data'],
            ),

        ];
    }

    /**
     * For Upload Page
     */
    public function forCreate(): array
    {
        return $this->cache->load(
            key: 'admin:library_create',
            callback: fn () => array_merge([
                ...$this->page->admin_meta(),
                'categories' => $this->create->handle(),
            ])
        );
    }
}
