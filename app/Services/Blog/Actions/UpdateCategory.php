<?php

declare(strict_types=1);

namespace App\Services\Blog\Actions;

use App\Http\Requests\UpdateCategoryRequest;
use App\Interfaces\Blog\Contracts\UpdateCategoryContract;
use App\Interfaces\Library\LibraryActionsInterface;
use App\Models\Category;
use Illuminate\Support\Str;

final readonly class UpdateCategory implements UpdateCategoryContract
{
    public function __construct(
        private LibraryActionsInterface $library,
    ) {
    }

    /**
     * Update Category
     */
    public function handle(
        UpdateCategoryRequest $request,
        Category $category
    ): bool {
        $validated = $request->validated();

        if ($request->hasFile('category_image')) {
            $image = $this->library->store(
                file: $validated['category_image'],
                directory: 'categories',
            );
            $category->category_image = $image['file_name'];
            $category->category_thumb = "api/img/cache/icon/{$image['file_name']}";

            if ( ! empty($category->images)) {
                $this->library->delete($category->images);
                $this->library->new(
                    model: $category,
                    file: $image,
                    category: 7,
                );
            }
        }

        if (empty($request->safe())) {
            return false;
        }
        $category->name = $request->validated('name');
        $category->description = $request->validated('description');
        $category->slug = Str::slug($request->validated('name'));
        $category->category_links = [
            'category_link' => '/learn-crypto/' . $category->slug,
            'next' => Category::query()->ofNext($category->id),
            'prev' => Category::query()->ofPrev($category->id),
        ];
        $category->save();
        cache()->flush();

        return true;
    }
}
