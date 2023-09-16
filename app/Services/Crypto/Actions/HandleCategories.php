<?php

declare(strict_types=1);

namespace App\Services\Crypto\Actions;

use App\Interfaces\Crypto\HandleCategoriesContract;
use App\Services\Crypto\DataObjects\CryptoCategoriesData;
use Cerbero\JsonParser\JsonParser;
use Spatie\Valuestore\Valuestore;

final class HandleCategories extends Valuestore implements HandleCategoriesContract
{
    /**
     * Handle Crypto Categories
     */
    public function handle(JsonParser $collection): void
    {
        $this->flush();
        $collection->traverse(function (
            mixed $value,
            string|int $key,
        ): void {
            if ($key <= 50) {
                $dataValue = CryptoCategoriesData::from([
                    ...$value,
                ]);
                $this->put($value['id'], $dataValue);
            }
        });
    }

    public function getCategories(): array
    {
        return $this->all();
    }
}
