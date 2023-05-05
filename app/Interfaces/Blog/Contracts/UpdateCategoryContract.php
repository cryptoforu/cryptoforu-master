<?php

namespace App\Interfaces\Blog\Contracts;

use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;

interface UpdateCategoryContract
{
    /**
     * Update Category
     */
    public function handle(UpdateCategoryRequest $request, Category $category): bool;
}
