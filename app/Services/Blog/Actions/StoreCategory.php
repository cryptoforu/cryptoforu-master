<?php

namespace App\Services\Blog\Actions;

use App\Http\Requests\StoreCategoryRequest;
use App\Interfaces\Blog\Contracts\StoreCategoryContract;
use App\Interfaces\Library\LibraryActionsInterface;
use App\Models\Category;
use Illuminate\Support\Str;

class StoreCategory implements StoreCategoryContract
{
    public function __construct(
        private readonly LibraryActionsInterface $library,
    ) {
    }

    public function handle(
        StoreCategoryRequest $request
    ) {
        $validated = $request->validated();

        if ($request->hasFile('category_image')) {
            $image = $this->library->store(
                file: $validated['category_image'],
                directory: 'categories'
            );
            $category_image = $image['file_name'];
            $category_thumb = $image['thumb'];
        }

        $category = Category::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'category_image' => $category_image,
            'category_thumb' => $category_thumb,
            'slug' => Str::slug($validated['name'], '-'),
        ]);

        $this->library->save(
            model: $category,
            file: $image,
            category: 7
        );
    }
}
