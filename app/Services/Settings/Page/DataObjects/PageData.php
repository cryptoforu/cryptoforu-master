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
class PageData extends Data
{
    public function __construct(
        public string $label,
        public Optional|string $route,
        public string $meta_desc,
        public Optional|string|null $meta_image,
        public Optional|string|null $tw_image,
        public Optional|string|null $og_image,
        public Lazy|int $parent_id,
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
            childs: Lazy::whenLoaded('childs', $page, fn () => PageData::collection($page->childs)),
            parents: Lazy::whenLoaded('parents', $page, fn () => PageData::from($page->parents))
        );
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

    public static function fromAttributes(array $attributes): self
    {
        return new self(
            label: strval(data_get($attributes, 'label')),
            route: Route::currentRouteName(),
            meta_desc: strval(data_get($attributes, 'meta_desc')),
            meta_image: strval(data_get($attributes, 'meta_image')),
            tw_image: Optional::create(),
            og_image: Optional::create(),
            parent_id: intval(data_get($attributes, 'parent_id')),
            page_type: strval(data_get($attributes, 'page_type')),
            page_name: strval(data_get($attributes, 'page_name')),
            childs: Optional::create(),
            parents: Lazy::create(fn () => PageData::fromModel(Page::find(intval(data_get($attributes, 'parent_id'))))),
        );
    }

    public static function rules(ValidationContext $context): array
    {
        return [
            'label' => ['required', 'string'],
            'route' => ['string'],
            'meta_desc' => ['required', 'string', 'max:180'],
            'meta_image' => gettype($context->payload['meta_image']) === 'string' ? '' : ['nullable', 'image', 'mimes:jpg,png,jpeg,gif,svg,webp', 'max:5048'],
            'tw_image' => gettype($context->payload['tw_image']) === 'string' ? '' : ['nullable', 'image', 'mimes:jpg,png,jpeg,gif,svg,webp', 'max:5048'],
            'og_image' => gettype($context->payload['og_image']) === 'string' ? '' : ['nullable', 'image', 'mimes:jpg,png,jpeg,gif,svg,webp', 'max:5048'],
            'parent_id' => ['required', 'integer'],
            'page_type' => ['required', 'string'],
            'page_name' => ['required', 'string'],
        ];
    }

    public static function schema(string $type = 'empty'): array
    {
        $schema = self::empty([
            'label' => $type === 'empty' ? '' : 'textfield',
            'route' => $type === 'empty' ? '' : 'textfield',
            'meta_desc' => $type === 'empty' ? '' : 'textarea',
            'meta_image' => $type === 'empty' ? null : 'file',
            'tw_image' => $type === 'empty' ? null : 'file',
            'og_image' => $type === 'empty' ? null : 'file',
            'parent_id' => $type === 'empty' ? 0 : 'select',
            'page_type' => $type === 'empty' ? '' : 'textfield',
            'page_name' => $type === 'empty' ? '' : 'textfield',
        ]);

        return Arr::except($schema, ['childs', 'parents']);
    }

    public static function editSchema(Page $page, string $type = 'initialValues')
    {
        $editSchema = self::empty([
            'label' => $type === 'initialValues' ? $page->label : 'textfield',
            'route' => $type === 'initialValues' ? $page->route : 'textfield',
            'meta_desc' => $type === 'initialValues' ? $page->meta_desc : 'textarea',
            'meta_image' => $type === 'initialValues' ? $page->meta_image : 'file',
            'tw_image' => $type === 'initialValues' ? $page->tw_image : 'file',
            'og_image' => $type === 'initialValues' ? $page->og_image : 'file',
            'parent_id' => $type === 'initialValues' ? $page->parent_id : 'select',
            'page_type' => $type === 'initialValues' ? $page->page_type : 'textfield',
            'page_name' => $type === 'initialValues' ? $page->page_name : 'textfield',
        ]);

        return Arr::except($editSchema, ['childs', 'parents']);
    }
}
