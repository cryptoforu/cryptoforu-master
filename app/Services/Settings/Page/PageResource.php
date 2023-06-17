<?php

declare(strict_types=1);

namespace App\Services\Settings\Page;

use App\Interfaces\Settings\PageInterface;
use App\Services\Settings\Page\Actions\GetAdminNavigation;
use App\Services\Settings\Page\Actions\GetPageMeta;
use App\Services\Settings\Page\Actions\ShowPageMeta;
use Illuminate\Support\Collection;

final class PageResource implements PageInterface
{
    public function __construct(
        private readonly GetPageMeta $meta,
        private readonly ShowPageMeta $pages,
        private readonly GetAdminNavigation $adminNavigation,
    ) {
    }

    /**
     * Get Front Meta
     */
    public function front_meta(?string $page = null): array
    {
        return array_merge([
            'meta' => $this->meta->handle(page_type: 'front', page: $page),
        ]);
    }

    /**
     * Get Admin Meta
     */
    public function admin_meta(?string $page = null): array
    {
        return array_merge([
            'meta' => $this->meta->handle(page: $page),
            'navigation' => $this->adminNavigation->handle(fallback: $page),
        ]);
    }

    public function show(): Collection|array
    {
        return $this->pages->handle();
    }

    public function getAdminNavigation(): array
    {
        return $this->adminNavigation->handle();
    }
}
