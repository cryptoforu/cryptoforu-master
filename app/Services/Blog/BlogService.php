<?php

declare(strict_types=1);

namespace App\Services\Blog;

use App\Contracts\CacheStoreContract;
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

class BlogService implements BlogInterface
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
        private readonly CacheStoreContract $store,
    ) {
    }

    /**
     * Backend Index Page Data
     *
     * @return array
     */
    public function forIndex()
    {
        return $this->store->load(
            key: 'blogIndex',
            callback: [
                'meta' => $this->page->getPageMeta(
                    page_type: 'admin',
                    page: 'admin_blog'
                ),
                'navigation' => $this->page->getAdminNavigation(),
                'post_table' => $this->show->handle(),
            ]
        );
    }

    /**
     * Backend Create Page Data
     *
     * @return array
     */
    public function forCreate()
    {
        return [
            'meta' => $this->page->getPageMeta(
                page_type: 'admin',
                page: 'admin_add_post'
            ),
            'navigation' => $this->page->getAdminNavigation(),
            'post_form' => $this->create->handle(),
        ];
    }

    /**
     * Backedn Edit Post
     */
    public function forEdit(Post $post): array
    {
        return [
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
        ];
    }

    /**
     * Get Blog Categories
     */
    public function forCategories(): array
    {
        return [
            'meta' => $this->page->getPageMeta(
                page_type: 'admin',
                page: 'admin_blog_categories'
            ),
            'navigation' => $this->page->getAdminNavigation(),
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
        ];
    }
}
