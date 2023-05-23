<?php

declare(strict_types=1);

namespace App\Services\FrontEnd;

use App\Interfaces\FrontEnd\FrontEndInterface;
use App\Interfaces\Settings\PageInterface;
use App\Services\FrontEnd\Queries\GetHomeData;
use Illuminate\Support\Facades\Cache;

final class FrontEndService implements FrontEndInterface
{
    public function __construct(
        private readonly PageInterface $page,
        private readonly GetHomeData $homeData,
    ) {
    }

    public function home(): array
    {
        return Cache::rememberForever(
            'home_page_data',
            fn () => array_merge([...$this->homeData->handle()])
        );
    }

    public function earn(): array
    {
        return lazy_load()->load(
            'earn_page_data',
            fn (): array => []
        );
    }

    public function list(): array
    {
        return lazy_load()->load(
            'list_page_data',
            fn (): array => []
        );
    }

    public function learn(): array
    {
        return lazy_load()->load(
            'learn_page_data',
            fn (): array => []
        );
    }

    public function crypto(): array
    {
        return lazy_load()->load(
            'crypto_page_data',
            fn (): array => []
        );
    }

    public function news(): array
    {
        return lazy_load()->load(
            'news_page_data',
            fn (): array => []
        );
    }

    public function markets(): array
    {
        return lazy_load()->load(
            'markets_page_data',
            fn (): array => []
        );
    }

    public function contact(): array
    {
        return lazy_load()->load(
            'contact_page_data',
            fn (): array => []
        );
    }
}
