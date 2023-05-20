<?php

declare(strict_types=1);

namespace App\Services\Earn;

use App\Contracts\CacheStoreContract;
use App\Interfaces\Earn\EarnServiceInterface;
use App\Interfaces\Settings\PageInterface;
use App\Models\Earn;
use App\Services\Earn\Actions\EditEarn;
use App\Services\Earn\Actions\GetEditForm;
use App\Services\Earn\Actions\ShowEarnData;

class EarnService implements EarnServiceInterface
{
    public function __construct(
        private readonly PageInterface $page,
        private readonly ShowEarnData $show,
        private readonly GetEditForm $create,
        private readonly EditEarn $edit,
        private readonly CacheStoreContract $store,
    ) {
    }

    /**
     * Backend Earn Index Page
     */
    public function forIndex(): array
    {
        $data = $this->show->handle();
        $meta = $this->store->load(
            key: 'earnIndex',
            callback: [
                'meta' => $this->page->getPageMeta(
                    page_type: 'admin',
                    page: 'admin_earn'
                ),
                'navigation' => $this->page->getAdminNavigation(),
                'select' => $data['select'],
            ]
        );

        return [
            ...$meta,
            ...$this->store->withInertia(
                collection: $data['data']
            ),

        ];
    }

    /**
     * Create Page Data
     *
     * @return void
     */
    public function forCreate()
    {
        return $this->store->load(
            key: 'earnCreate',
            callback: [
                'meta' => $this->page->getPageMeta(
                    page_type: 'admin',
                    page: 'admin_add_earning_methods'
                ),
                'navigation' => $this->page->getAdminNavigation(),
                'earn_form' => $this->create->handle(),
            ]
        );
    }

    /**
     * Edit Page Data
     *
     * @return void
     */
    public function forEdit(Earn $earn)
    {
        return $this->store->load(
            key: $earn->title,
            callback: [
                ...$this->edit->handleMeta($earn),
                'edit_form' => $this->edit->handle($earn),
            ]
        );
    }
}
