<?php
declare (strict_types = 1);
namespace App\Services\FrontEnd;

use App\Contracts\CacheStoreContract;
use App\Interfaces\FrontEnd\FrontEndInterface;
use App\Interfaces\Settings\PageInterface;
use App\Services\FrontEnd\Queries\GetHomeData;

class FrontEndService implements FrontEndInterface
{
    public function __construct(
        private readonly CacheStoreContract $store,
        private readonly PageInterface $page,
        private readonly GetHomeData $homeData,
    ) {
    }

    public function home(): array
    {
        return $this->store->load(
            key:'homePage',
            callback:[
                'meta' => $this->page->getPageMeta(
                    page_type:'front',
                    page:'home'
                ),
                ...$this->homeData->handle(),
            ]
        );
    }

    public function earn(): array
    {
        return $this->store->load(
            key:'earnPage',
            callback:[
                'meta' => $this->page->getPageMeta(
                    page_type:'front',
                    page:'earn_crypto'
                ),
            ]
        );
    }

    function list(): array
    {
        return $this->store->load(
            key:'listPage',
            callback:[
                'meta' => $this->page->getPageMeta(
                    page_type:'front',
                    page:'faucets-lists'
                ),
            ]
        );
    }

    public function learn(): array
    {
        return $this->store->load(
            key:'learnPage',
            callback:[
                'meta' => $this->page->getPageMeta(
                    page_type:'front',
                    page:'learn_crypto'
                ),
            ]
        );
    }

    public function crypto(): array
    {
        return $this->store->load(
            key:'cryptoPage',
            callback:[
                'meta' => $this->page->getPageMeta(
                    page_type:'front',
                    page:'crypto'
                ),
            ]
        );
    }

    public function news(): array
    {
        return $this->store->load(
            key:'newsPage',
            callback:[
                'meta' => $this->page->getPageMeta(
                    page_type:'front',
                    page:'crypto_news'
                ),
            ]
        );
    }

    public function markets(): array
    {
        return $this->store->load(
            key:'marketsPage',
            callback:[
                'meta' => $this->page->getPageMeta(
                    page_type:'front',
                    page:'crypto_exchanges'
                ),
            ]
        );
    }

    public function contact(): array
    {
        return $this->store->load(
            key:'contactPage',
            callback:[
                'meta' => $this->page->getPageMeta(
                    page_type:'front',
                    page:'contact'
                ),
            ]
        );
    }
}
