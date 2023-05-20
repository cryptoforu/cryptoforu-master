<?php

declare(strict_types=1);

namespace App\Services\Site\Queries;

use App\Interfaces\Site\SocialLinksContract;
use App\Models\Site;
use App\Services\Site\DataObjects\HomePage\SocialLinksData;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;

class GetSocialLinks implements SocialLinksContract
{
    public function handle()
    {
        return Cache::rememberForever('social', function () {
            return (new Collection(
                items: Site::ofData('home_page')->data_values['social_links']
            ))->map(fn ($social) => SocialLinksData::from($social))->toArray();
        });
    }
}
