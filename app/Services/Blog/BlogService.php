<?php

declare(strict_types=1);

namespace App\Services\Blog;

use App\Contracts\CacheContract;
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

final readonly class BlogService implements BlogInterface
{
  /**
   * Blog  Backend
   */
  public function __construct(
    private PageInterface $page,
    private ShowPosts $show,
    private GetPostForm $create,
    private EditPost $edit,
    private CategoryForm $categoryForm,
    private ShowCategories $showCategories,
    private CacheContract $cache,
  ) {
  }

  /**
   * Backend Index Page Data
   */
  public function forIndex(): array
  {
    return array_merge([
      ...$this->page->admin_meta(),
      'post_table' => $this->show->handle(),
    ]);
  }

  /**
   * Backend Create Page Data
   */
  public function forCreate(): array
  {
    return $this->cache->load(
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
    return [
      'meta' => PageData::fromPost($post)->include('parents'),
      'navigation' => AdminNavigation::from([
        'label' => 'Blog Posts',
        'route' => route('admin:blog:post.index', [], false),
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
    $show = $this->cache->withInertia(
      collection: $this->showCategories->handle()
    );
    $rest = $this->cache->load(
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
