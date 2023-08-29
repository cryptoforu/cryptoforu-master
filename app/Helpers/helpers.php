<?php

declare(strict_types=1);

use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

if ( ! function_exists('settings')) {
    /**
     * @throws ContainerExceptionInterface
     * @throws NotFoundExceptionInterface
     */
    function settings($key = null, $default = null)
    {
        if (null === $key) {
            return app(App\Services\Settings\SettingsResources::class);
        }

        return app(App\Services\Settings\SettingsResources::class)->get(
            $key,
            $default
        );
    }
}
if ( ! function_exists('')) {
    if ( ! function_exists('lazy_load')) {
        /**
         * @throws ContainerExceptionInterface
         * @throws NotFoundExceptionInterface
         */
        function lazy_load(?string $key = null, $default = null)
        {
            if (null === $key) {
                return app(App\Services\Store\CacheStoreService::class);
            }

            return app(App\Services\Store\CacheStoreService::class)->get(
                $key,
                $default
            );
        }
    }
}

if ( ! function_exists('format_currency')) {
    /**
     * Format Currency
     *
     * @return false|string
     */
    function format_currency(
        float $amount,
        string $intl = 'en_US',
        string $currency = 'USD',
    ): bool|string {
        return (new NumberFormatter(
            $intl,
            NumberFormatter::CURRENCY
        )
        )->formatCurrency(
            $amount,
            $currency
        );
    }
}

if ( ! function_exists('format_percentage')) {
    /**
     * Format Percentage
     *
     * @return string|false
     */
    function format_percentage(
        float $number,
        ?int $divide = null,
        string $intl = 'en_US',
    ): string|bool {
        $fmt = new NumberFormatter($intl, NumberFormatter::PERCENT);
        $fmt->setAttribute(NumberFormatter::MIN_FRACTION_DIGITS, 2);
        $fmt->setAttribute(NumberFormatter::MAX_FRACTION_DIGITS, 2);
        if (null === $divide) {
            return $fmt->format($number);
        }

        return $fmt->format($number / $divide);
    }
}

if ( ! function_exists('cal_percentage')) {
    function cal_percentage(
        float $num_amount,
        float $num_total,
        string $intl = 'en_US'
    ): false|string {
        $count1 = ($num_amount / $num_total) * 100;
        $count2 = $count1 / 100;
        $fmt = new NumberFormatter($intl, NumberFormatter::PERCENT);
        $fmt->setAttribute(NumberFormatter::MIN_FRACTION_DIGITS, 2);
        $fmt->setAttribute(NumberFormatter::MAX_FRACTION_DIGITS, 2);

        return $fmt->format($count2);
    }
}

if ( ! function_exists('format_satoshi')) {
    function format_satoshi(float $amount, string $intl = 'en_US'): false|string
    {
        $fmt = new NumberFormatter(
            locale: $intl,
            style: NumberFormatter::DECIMAL
        );
        $fmt->setAttribute(
            attribute: NumberFormatter::MIN_FRACTION_DIGITS,
            value: 8
        );

        return $fmt->format(
            num: $amount
        );
    }
}
