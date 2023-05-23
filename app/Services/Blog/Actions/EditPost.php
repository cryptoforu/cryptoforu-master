<?php

declare(strict_types=1);

namespace App\Services\Blog\Actions;

use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use App\Services\Blog\DataObjects\CategoryData;
use App\Services\Blog\DataObjects\PostData;
use App\Services\Blog\DataObjects\TagsData;
use App\Services\Blog\Enums\PostStatus;
use App\Services\Settings\Concerns\FormFactory;
use Illuminate\Support\Collection;

final class EditPost
{
    use FormFactory;

    public function handle(Post $post)
    {
        $initialValues = (new Collection(items: PostData::editSchema($post)));
        $options = [
            'category_id' => CategoryData::collection(items: Category::all()->map(fn ($category) => $category->getData()))->toArray(),
            'tags' => TagsData::collection(items: Tag::all()->map(fn ($tag) => $tag->getData()))->toArray(),
            'status' => PostStatus::options(),
        ];

        $schema = $this->generate(
            items: (new Collection(items: PostData::editSchema(post: $post, type: 'n'))),
            options: $options
        );

        return [
            'initialValues' => $initialValues,
            'form_schema' => $schema,
            'form_route' => route('admin-blog.update', ['post' => $post], false),
        ];
    }
}
