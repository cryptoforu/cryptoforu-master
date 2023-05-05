<?php

namespace App\Services\Blog\Actions;

use App\Http\Requests\UpdateCategoryRequest;
use App\Interfaces\Blog\Contracts\UpdateCategoryContract;
use App\Interfaces\Library\LibraryActionsInterface;
use App\Models\Category;
use Illuminate\Support\Str;

class UpdateCategory implements UpdateCategoryContract
{
    public function __construct(
        private readonly LibraryActionsInterface $library,
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
            $category->category_thumb = $image['thumb'];

            if (! empty($category->image)) {
                $this->library->delete($category->image);
                $this->library->new(
                    model: $category,
                    file: $image,
                    category: 7,
                );
            }
        }
        $request->collect(['name', 'description'])->map(function ($item, $key) use ($category) {
            $category->$key = $item;
        });
        if (empty($request->safe())) {
            return false;
        }
        $category->slug = Str::slug($request->validated('name'));
        $category->save();

        return true;
    }
}
