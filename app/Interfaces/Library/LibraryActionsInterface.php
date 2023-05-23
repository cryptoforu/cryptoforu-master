<?php

declare(strict_types=1);

namespace App\Interfaces\Library;

use App\Http\Requests\StoreLibraryRequest;
use App\Models\Library;
use Illuminate\Database\Eloquent\Model;
use Intervention\Image\Image;

interface LibraryActionsInterface
{
    /**
     * Store File
     */
    public function store($file, string $directory): Image|array;

    /**
     * Destroy File
     */
    public function delete(Library $library): bool;

    /**
     * Create New Model
     */
    public function new(Model $model, array $file, int $category): bool;

    /**
     * Save Image From Model
     *
     * @return void
     */
    public function save(Model $model, array $file, int $category): void;

    /**
     * Upload File
     *
     * @return void
     */
    public function create(StoreLibraryRequest $request): void;
}
