<?php

declare(strict_types=1);

namespace App\Services\Earn\ApiResource;

use App\Enums\BadgeEnum;
use App\Models\Earn;
use App\Services\Earn\Enums\EarnStatus;
use App\Services\Earn\Enums\FeaturedEnum;
use Closure;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;
use Spatie\LaravelData\Optional;

final class EarnApiResource extends Data
{
    public function __construct(
        public int $id,
        public string $title,
        public Optional|Lazy|string $content,
        public string|null $image,
        public Optional|Lazy|string $thumb,
        public string $link,
        public Optional|Lazy|FeaturedEnum $featured,
        public Optional|Lazy|EarnStatus $status,
        public string|null $image_name,
        public int $earn_category_id,
        public string|null $main_features,
        public array|Closure $badge,
        #[DataCollectionOf(EarnCategoryApiData::class)]
        public Optional|Lazy|EarnCategoryApiData $earnCategory,
    ) {
    }

    public static function fromModel(Earn $earn): self
    {

        return new self(
            id: $earn->id,
            title: $earn->title,
            content: Lazy::create(fn () => $earn->content),
            image: $earn->image,
            thumb: Lazy::create(fn () => $earn->thumb),
            link: $earn->link,
            featured: Lazy::create(fn () => $earn->featured),
            status: Lazy::create(fn () => $earn->status),
            image_name: $earn->image_name,
            earn_category_id: $earn->earn_category_id,
            main_features: $earn->main_features,
            badge: BadgeEnum::randomBadge(),
            earnCategory: Lazy::whenLoaded(
                'earnCategory',
                $earn,
                static fn () => EarnCategoryApiData::from($earn->earnCategory)
            ),
        );
    }
}
