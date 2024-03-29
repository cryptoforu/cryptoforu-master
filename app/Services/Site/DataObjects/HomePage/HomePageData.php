<?php

declare(strict_types=1);

namespace App\Services\Site\DataObjects\HomePage;

use App\Models\Site;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;

final class HomePageData extends Data
{
  public function __construct(
    public HeroData $hero,
    #[DataCollectionOf(FeaturesData::class)]
    public Collection $features,
    #[DataCollectionOf(SocialLinksData::class)]
    public Collection $social_links,
  ) {
  }

  public static function fromModel(Site $site): Collection
  {
    return collect(
      value: [
        'title' => Str::headline($site->data_name),
        'home_data' => [
          self::fromCollection(
            col: $site->data_values
          ),
        ],
      ]
    );
  }

  public static function fromCollection(Collection $col): self
  {
    return new self(
      hero: HeroData::from(data_get($col, 'hero.0')),
      features: collect(
        value: data_get($col, 'features')
      )->map(fn($f) => FeaturesData::from($f)),
      social_links: collect(
        value: data_get($col, 'social_links')
      )->map(fn($s) => SocialLinksData::from($s)),
    );
  }

  public static function fromData(): HomePageData
  {
    $query = Site::ofData('home_page');

    return self::fromCollection(
      col: $query->data_values,
    );
  }
}
