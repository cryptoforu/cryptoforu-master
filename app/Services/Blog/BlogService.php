<?php

declare(strict_types=1);

namespace App\Services\Blog;

use App\Interfaces\Blog\BlogInterface;
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
  public function forIndex(): array
  {
    return lazy_load()->load(
      key: 'admin:blog_index',
      callback: fn() => array_merge([
        ...$this->page->admin_meta(),
        'post_table' => $this->show->handle(),
      ])
    );
  }

  /**
   * Backend Create Page Data
   */
  public function forCreate(): array
  {
    return lazy_load()->load(
      key: 'admin:blog_create',
      callback: fn() => array_merge([
        ...$this->page->admin_meta(),
        'post_form' => $this->create->handle(),
      ])
    );
  }

  /**
   * Backend Edit Post
   */
  public function forEdit(Post $post): array
  {
    return lazy_load()->load(
      key: 'admin:blog_edit',
      callback: function () use ($post) {
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
    $show = lazy_load()->withInertia(
      collection: $this->showCategories->handle()
    );
    $rest = lazy_load()->load(
      key: 'admin_blog_categories',
      callback: fn() => array_merge([
        ...$this->page->admin_meta(),
        'category_form' => $this->categoryForm->handle(),
        'category_table' => CategoryData::collection(
          items: Category::all()
        )->include('category_image')->toArray(),
      ])

    );
    return [
      ...$show,
      ...$rest,
    ];
  }
}
