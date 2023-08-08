<?php

declare(strict_types=1);

namespace App\Services\Earn;

use App\Contracts\CacheContract;
use App\Interfaces\Earn\EarnServiceInterface;
use App\Interfaces\Settings\PageInterface;
use App\Models\Earn;
use App\Services\Earn\Actions\EditEarn;
use App\Services\Earn\Actions\GetEditForm;
use App\Services\Earn\Actions\ShowEarnData;

final class EarnService implements EarnServiceInterface
{
    public function __construct(
        private readonly PageInterface $page,
        private readonly ShowEarnData $show,
        private readonly GetEditForm $create,
        private readonly EditEarn $edit,
        private readonly CacheContract $cache,
    ) {
    }

    /**
     * Backend Earn Index Page
     */
    public function forIndex(): array
    {
        $data = $this->show->handle();
        $meta = $this->cache->load(
            key: 'admin:earn_data',
            callback: function () use ($data) {
                return array_merge([
                    ...$this->page->admin_meta(),
                    'select' => $data['select'],
                ]);
            }
        );

        return array_merge([
            ...$meta,
            ...$this->cache->withInertia($data['data']),
        ]);
    }

    /**
     * Create Page Data
     */
    public function forCreate(): array
    {
        return $this->cache->load(
            key: 'admin_earn_create',
            callback: function () {
                return array_merge([
                    ...$this->page->admin_meta(),
                    'earn_form' => $this->create->handle(),
                ]);
            }
        );
    }

    /**
     * Edit Page Data
     */
    public function forEdit(Earn $earn): array
    {
        return $this->cache->load(
            key: $earn->title,
            callback: function () use ($earn) {
                return array_merge([
                    ...$this->edit->handleMeta($earn),
                    'edit_form' => $this->edit->handle($earn),
                ]);
            }
        );
    }
}
