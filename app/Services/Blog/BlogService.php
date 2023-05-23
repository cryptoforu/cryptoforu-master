<?php

declare(strict_types=1);

namespace App\Services\Blog;

use App\Interfaces\Blog\BlogInterface;
use App\Interfaces\Settings\MenuInterface;
use App\Interfaces\Settings\PageInterface;
use App\Models\Category;
use App\Models\Post;
use App\Services\Blog\Actions\CategoryForm;
use App\Services\Blog\Actions\EditPost;
use App\Services\Blog\Actions\GetPostForm;
use App\Services\Blog\Actions\ShowCategories;
use App\Services\Blog\Actions\ShowPosts;
use App\Services\Blog\DataObjects\CategoryData;
use App\Services\Settings\Page\DataObjects\AdminNavigation;
use App\Services\Settings\Page\DataObjects\PageData;

final class BlogService implements BlogInterface
{
    /**
     * Blog  Backend
     */
    public function __construct(
        private readonly PageInterface $page,
        private readonly MenuInterface $menu,
        private readonly ShowPosts $show,
        private readonly GetPostForm $create,
        private readonly EditPost $edit,
        private readonly CategoryForm $categoryForm,
        private readonly ShowCategories $showCategories,
    ) {
    }

    /**
     * Backend Index Page Data
     *
     * @return array
     */
    public function forIndex()
    {
        return lazy_load()->load(
            'admin_blog_index',
            function () {
                return array_merge([
                    ...$this->page->admin_meta(),
                    'post_table' => $this->show->handle(),
                ]);
            }
        );

    }

    /**
     * Backend Create Page Data
     *
     * @return array
     */
    public function forCreate()
    {
        lazy_load()->load(
            'admin_blog_create',
            function () {
                return array_merge([
                    ...$this->page->admin_meta(),
                    'post_form' => $this->create->handle(),
                ]);
            }
        );
    }

    /**
     * Backedn Edit Post
     */
    public function forEdit(Post $post): array
    {
        return lazy_load()->load(
            'admin_blog_edit',
            function () use ($post) {
                return array_merge([
                    'meta' => PageData::fromPost($post)->include('parents'),
                    'navigation' => AdminNavigation::from([
                        'label' => 'Blog Posts',
                        'route' => route('admin-blog', [], false),
                        'parents' => [
                            'label' => 'Blog Posts',
                            'route' => 'admin-blog',
                        ],
                    ]),
                    'edit_form' => $this->edit->handle(
                        post: $post
                    ),
                ]);
            }
        );
    }

    /**
     * Get Blog Categories
     */
    public function forCategories(): array
    {
        return lazy_load()->load(
            'admin_blog_categories',
            function () {
                return array_merge([
                    ...$this->page->admin_meta(),
                    ...$this->showCategories->handle(),
                    'category_form' => $this->categoryForm->handle(),
                    'category_table' => CategoryData::collection(
                        items: Category::all()->map(fn ($category) => CategoryData::from($category)
                            ->additional([
                                'endpoints' => [
                                    'delete' => route('admin-categories.destroy', ['category' => $category]),
                                ],
                            ]))
                    )->include('category_image'),
                ]);
            }
        );
    }
}
