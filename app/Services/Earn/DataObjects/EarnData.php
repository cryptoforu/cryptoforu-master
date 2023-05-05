<?php

namespace App\Services\Earn\DataObjects;

use App\Models\Earn;
use App\Services\Earn\Enums\FeaturedEnum;
use Illuminate\Support\Arr;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;
use Spatie\LaravelData\Optional;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript('EarnData')]
class EarnData extends Data
{
    public function __construct(
        public int $id,
        public string $title,
        public Optional|Lazy|string $content,
        public Optional|Lazy|string $image,
        public Optional|Lazy|string $thumb,
        public Optional|Lazy|string $link,
        public Optional|Lazy|FeaturedEnum $featured,
        public Optional|Lazy|string $image_name,
        public Optional|Lazy|int $earn_category_id,
        public Optional|Lazy|string $main_features,
        #[DataCollectionOf(EarnCategoryData::class)]
        public Optional|Lazy|EarnCategoryData $earnCategory,
    ) {
    }

    public static function fromModel(Earn $earn): self
    {
        return new self(
            id: $earn->id,
            title: $earn->title,
            content: Lazy::create(fn () => $earn->content),
            image: Lazy::create(fn () => $earn->image),
            thumb: Lazy::create(fn () => $earn->thumb),
            link: Lazy::create(fn () => $earn->link),
            featured: Lazy::create(fn () => $earn->featured),
            image_name: Lazy::create(fn () => $earn->image_name),
            earn_category_id: Lazy::create(fn () => $earn->earn_category_id),
            main_features: Lazy::create(fn () => $earn->main_features),
            earnCategory: Lazy::whenLoaded('earnCategory', $earn, fn () => EarnCategoryData::from($earn->earnCategory)),
        );
    }

    public static function schema(string $type = 'empty'): array
    {
        $schema = self::empty([
            'title' => $type === 'empty' ? '' : 'textfield',
            'content' => $type === 'empty' ? '' : 'md',
            'link' => $type === 'empty' ? '' : 'textfield',
            'image' => $type === 'empty' ? null : 'file',
            'featured' => $type === 'empty' ? '' : 'switch',
            'earn_category_id' => $type === 'empty' ? 0 : 'select',
        ]);

        return Arr::except($schema, ['id', 'thumb', 'image_name', 'earnCategory', 'main_features']);
    }

    public static function editSchema(Earn $earn, string $type = 'initial'): array
    {
        $schema = self::empty([
            'title' => $type === 'initial' ? $earn->title : 'textfield',
            'content' => $type === 'initial' ? $earn->content : 'md',
            'link' => $type === 'initial' ? $earn->link : 'textfield',
            'image' => $type === 'initial' ? null : 'file',
            'featured' => $type === 'initial' ? $earn->featured : 'switch',
            'earn_category_id' => $type === 'initial' ? $earn->earn_category_id : 'select',
        ]);

        return Arr::except($schema, ['id', 'thumb', 'image_name', 'earnCategory', 'main_features']);
    }
}
