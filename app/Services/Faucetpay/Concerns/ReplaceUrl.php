<?php

declare(strict_types=1);

namespace App\Services\Faucetpay\Concerns;

use Illuminate\Support\Collection;

trait ReplaceUrl
{
    public function replaceUrl(
        $faucets,
        $wallets,
        $refs
    ): Collection {
        return collect($faucets)->map(function ($value) use ($wallets, $refs) {
            $r = $refs->collapse();
            $w = $wallets->collapse();
            $site_found = $this->findSite($r, $value->url);

            if ($site_found) {
                $value->url = $site_found;
            } else {
                $value->url = (isset($w[$value->currency])) ? $value->url . '?r=' . $w[$value->currency] : $value->url;
            }

            return $value;
        })->sortBy(
            [
                ['health', 'desc'],
                ['paid_today', 'desc'],
                ['total_users_paid', 'desc'],
            ]
        )->values();
    }

    public function findSite($sites, $url)
    {
        $to_check = $sites->keys();

        foreach ($to_check as $a) {
            if (false !== mb_stripos($url, $a)) {
                return $sites[$a];
            }
        }

        return false;
    }
}
