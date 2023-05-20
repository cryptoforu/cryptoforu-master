<?php
declare (strict_types = 1);
namespace App\Services\Site;

use App\Contracts\CacheStoreContract;
use App\Interfaces\Settings\PageInterface;
use App\Interfaces\Site\SiteInterface;
use App\Models\Site;
use App\Services\Site\Queries\ShowData;

class SiteService implements SiteInterface
{
    public function __construct(
        private PageInterface $page,
        private ShowData $show,
        private CacheStoreContract $store,
    ) {
    }
    /**
     * For Index Site Data
     *
     * @return array
     */
    public function forIndex(): array
    {
        $data = $this->show->handle();
        $meta = $this->store->load(
            key:'siteIndex',
            callback:[
                'meta' => $this->page->getPageMeta(
                    page_type:'admin',
                    page:'site_data'
                ),
                'navigation' => $this->page->getAdminNavigation(),
                'select' => $data['select'],
            ]
        );
        return [
            ...$meta,
            ...$this->store->withInertia(
                collection:$data['data'],
            ),

        ];
    }
    /**
     * For Create Site Data
     *
     * @return array
     */
    public function forCreate(): array
    {
        return $this->store->load(
            key:'siteCreate',
            callback:[
                'meta' => $this->page->getPageMeta(
                    page_type:'admin',
                    page:'site_create'
                ),
                'navigation' => $this->page->getAdminNavigation(),
            ]
        );
    }
}
