<?php

declare(strict_types=1);

namespace App\Services\Settings\Page;

use App\Interfaces\Settings\PageInterface;
use App\Services\Settings\Page\Actions\GetAdminNavigation;
use App\Services\Settings\Page\Actions\GetPageMeta;
use App\Services\Settings\Page\Actions\ShowPageMeta;
use Illuminate\Support\Collection;

class PageResource implements PageInterface
{
    public function __construct(
        private readonly GetPageMeta $meta,
        private readonly ShowPageMeta $pages,
        private readonly GetAdminNavigation $adminNavigation,
    ) {
    }

    /**
     * Get Page Meta Data
     */
    public function getPageMeta(string $page_type, string $page): mixed
    {
        return $this->meta->handle(
            page_type: $page_type,
            page: $page,
        );
    }

    public function show(): Collection|array
    {
        return $this->pages->handle();
    }

    public function getAdminNavigation(): mixed
    {
        return $this->adminNavigation->handle();
    }
}
