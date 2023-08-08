<?php

declare(strict_types=1);

namespace App\Services\Site;

use App\Contracts\CacheContract;
use App\Interfaces\Settings\PageInterface;
use App\Interfaces\Site\SiteInterface;
use App\Services\Site\Queries\ShowData;

final class SiteService implements SiteInterface
{
    public function __construct(
        private readonly PageInterface $page,
        private readonly ShowData $show,
        private readonly CacheContract $cache,
    ) {
    }

    /**
     * For Index Site Data
     */
    public function forIndex(): array
    {
        $data = $this->show->handle();
        $meta = $this->cache->load(
            key: 'admin:site_data',
            callback: fn () => array_merge([
                ...$this->page->admin_meta(),
                'select' => $this->show->handle()['select'],
            ])
        );

        return [
            ...$meta,
            ...$this->cache->withInertia(
                collection: $data['data'],
            ),

        ];
    }

    /**
     * For Create Site Data
     */
    public function forCreate(): array
    {
        return $this->cache->load(
            key: 'admin:site_create',
            callback: fn () => array_merge([
                ...$this->page->admin_meta(),
            ])
        );
    }
}
