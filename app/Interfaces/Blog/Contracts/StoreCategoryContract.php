<?php

declare(strict_types=1);

namespace App\Interfaces\Blog\Contracts;

use App\Http\Requests\StoreCategoryRequest;

interface StoreCategoryContract
{
    /**
     * Store Category
     */
    public function handle(StoreCategoryRequest $request): void;
}
