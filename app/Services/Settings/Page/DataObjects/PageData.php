<?php

declare(strict_types=1);

namespace App\Services\Settings\Page\DataObjects;

use App\Models\Page;
use App\Models\Post;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Route;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Attributes\WithoutValidation;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\LaravelData\Lazy;
use Spatie\LaravelData\Optional;
use Spatie\LaravelData\Support\Validation\ValidationContext;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript('PageMeta')]
final class PageData extends Data
{
    public function __construct(
        public string $label,
        public Optional|string $route,
        public string $meta_desc,
        public Optional|string|null $meta_image,
        public Optional|string|null $tw_image,
        public Optional|string|null $og_image,
        public Optional|Lazy|int $parent_id,
        public Optional|string $page_type,
        public Optional|string $page_name,
        #[
            DataCollectionOf(PageData::class),
            WithoutValidation
        ]
        public Optional|Lazy|DataCollection $childs,
        #[
            DataCollectionOf(PageData::class),
            WithoutValidation
        ]
        public Optional|Lazy|DataCollection $parents
    ) {
    }

    public static function fromPost(Post $post): self
    {
        return new self(
            label: $post->title,
            route: Route::currentRouteName(),
            meta_desc: $post->introduction,
            meta_image: $post->featured_image,
            tw_image: Optional::create(),
            og_image: Optional::create(),
            parent_id: 3,
            page_type: 'admin',
            page_name: 'edit-post',
            childs: Optional::create(),
            parents: Lazy::create(fn () => PageData::fromModel(Page::find(3))),
        );
    }

    public static function fromModel(Page $page): self
    {
        return new self(
            label: $page->label,
            route: $page->route,
            meta_desc: $page->meta_desc,
            meta_image: $page->meta_image,
            tw_image: $page->tw_image,
            og_image: $page->og_image,
            parent_id: $page->parent_id,
            page_type: $page->page_type,
            page_name: $page->page_name,
            childs: Lazy::whenLoaded(
                'childs',
                $page,
                fn () => PageData::collection($page->childs)
            ),
            parents: Lazy::whenLoaded(
                'parents',
                $page,
                fn () => PageData::from($page->parents)
            )
        );
    }

    public static function fromAttributes(array $attributes): self
    {
        return new self(
            label: (string) (data_get($attributes, 'label')),
            route: Route::currentRouteName(),
            meta_desc: (string) (data_get($attributes, 'meta_desc')),
            meta_image: (string) (data_get($attributes, 'meta_image')),
            tw_image: Optional::create(),
            og_image: Optional::create(),
            parent_id: (int) (data_get($attributes, 'parent_id')),
            page_type: (string) (data_get($attributes, 'page_type')),
            page_name: (string) (data_get($attributes, 'page_name')),
            childs: Optional::create(),
            parents: Lazy::create(fn (
            ) => PageData::fromModel(Page::find((int) (data_get(
                $attributes,
                'parent_id'
            ))))),
        );
    }

    public static function rules(ValidationContext $context): array
    {
        return [
            'label' => ['required', 'string'],
            'route' => ['string'],
            'meta_desc' => ['required', 'string', 'max:180'],
            'meta_image' => 'string' === gettype($context->payload['meta_image']) ? '' : [
                'nullable', 'image', 'mimes:jpg,png,jpeg,gif,svg,webp', 'max:5048',
            ],
            'tw_image' => 'string' === gettype($context->payload['tw_image']) ? '' : [
                'nullable', 'image', 'mimes:jpg,png,jpeg,gif,svg,webp', 'max:5048',
            ],
            'og_image' => 'string' === gettype($context->payload['og_image']) ? '' : [
                'nullable', 'image', 'mimes:jpg,png,jpeg,gif,svg,webp', 'max:5048',
            ],
            'parent_id' => ['required', 'integer'],
            'page_type' => ['required', 'string'],
            'page_name' => ['required', 'string'],
        ];
    }

    public static function schema(string $type = 'empty'): array
    {
        $schema = self::empty([
            'label' => 'empty' === $type ? '' : 'textfield',
            'route' => 'empty' === $type ? '' : 'textfield',
            'meta_desc' => 'empty' === $type ? '' : 'textarea',
            'meta_image' => 'empty' === $type ? null : 'file',
            'tw_image' => 'empty' === $type ? null : 'file',
            'og_image' => 'empty' === $type ? null : 'file',
            'parent_id' => 'empty' === $type ? 0 : 'select',
            'page_type' => 'empty' === $type ? '' : 'textfield',
            'page_name' => 'empty' === $type ? '' : 'textfield',
        ]);

        return Arr::except($schema, ['childs', 'parents']);
    }

    public static function editSchema(
        Page $page,
        string $type = 'initialValues'
    ): array {
        $editSchema = self::empty([
            'label' => 'initialValues' === $type ? $page->label : 'textfield',
            'route' => 'initialValues' === $type ? $page->route : 'textfield',
            'meta_desc' => 'initialValues' === $type ? $page->meta_desc : 'textarea',
            'meta_image' => 'initialValues' === $type ? $page->meta_image : 'file',
            'tw_image' => 'initialValues' === $type ? $page->tw_image : 'file',
            'og_image' => 'initialValues' === $type ? $page->og_image : 'file',
            'parent_id' => 'initialValues' === $type ? $page->parent_id : 'select',
            'page_type' => 'initialValues' === $type ? $page->page_type : 'textfield',
            'page_name' => 'initialValues' === $type ? $page->page_name : 'textfield',
        ]);

        return Arr::except($editSchema, ['childs', 'parents']);
    }
}
