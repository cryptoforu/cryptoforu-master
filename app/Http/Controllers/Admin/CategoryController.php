<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Interfaces\Blog\BlogInterface;
use App\Interfaces\Blog\Contracts\StoreCategoryContract;
use App\Interfaces\Blog\Contracts\UpdateCategoryContract;
use App\Interfaces\Library\LibraryDeleteContract;
use App\Models\Category;
use App\Models\Library;
use App\Services\Library\Concerns\Cleanable;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

final class CategoryController extends Controller
{
  use Cleanable;

  protected BlogInterface $blog;

  protected StoreCategoryContract $storeCategory;

  protected UpdateCategoryContract $updateCategory;

  protected LibraryDeleteContract $library;


  public function __construct(
    BlogInterface $blog,
    StoreCategoryContract $storeCategory,
    UpdateCategoryContract $updateCategory,
    LibraryDeleteContract $library,
  ) {
    $this->blog = $blog;
    $this->storeCategory = $storeCategory;
    $this->updateCategory = $updateCategory;
    $this->library = $library;
  }

  /**
   * Display a listing of the resource.
   */
  public function index(): Response
  {
    return Inertia::render(
      component: 'Admin/Blog/Categories',
      props: $this->blog->forCategories(),
    );
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create(): void
  {
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreCategoryRequest $request): RedirectResponse
  {
    $this->storeCategory->handle(
      request: $request
    );

    return back()->with('success', 'Added New Category Successfully');
  }

  /**
   * Display the specified resource.
   */
  public function show(Category $category): void
  {
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Category $category): void
  {
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(
    UpdateCategoryRequest $request,
    Category $category
  ): RedirectResponse {
    $this->updateCategory->handle(
      request: $request,
      category: $category,
    );

    return back()->with('success', 'Updated Category Successfully');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Category $category): RedirectResponse
  {
    if ($category->exists) {
      if ($category->posts()) {
        $category->posts()->with('images')->each(function ($post) {
          if ($post->images()) {
            foreach ($post->images as $img) {
              $this->library->handle(
                Library::query()
                  ->find($img->id)
              );
            }
          }
          $post->delete();
        });
      }
      if (!is_null($category->images)) {
        $this->library->handle($category->images);
      }

      $category->delete();
      $this->clean([$category->category_image, $category->category_thumb]);
    }
    cache()->flush();
    return back()->with('success', 'Deleted Category Successfully');
  }
}
