<?php

declare(strict_types=1);

namespace App\Services\Crypto\Actions;

use App\Interfaces\Crypto\HandleCategoriesContract;
use App\Models\Crypto;
use Illuminate\Support\Collection;

final class HandleCategories implements HandleCategoriesContract
{
    /**
     * Handle Crypto Categories
     */
    public function handle(Collection $data_values): bool
    {
        if (Crypto::ofName('categories')) {
            Crypto::ofName('categories')->update([
                'data_values' => $data_values,
            ]);

            return true;
        }
        Crypto::create([
            'data_name' => 'categories',
            'data_values' => $data_values,
        ]);

        return true;

        return false;
    }
}
