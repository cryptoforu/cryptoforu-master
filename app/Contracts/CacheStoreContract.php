<?php

declare(strict_types=1);

namespace App\Contracts;

use Illuminate\Support\Collection;

interface CacheStoreContract
{
    /**
     * Load Cache Data
     *
     * @param [type] $callback
     * @param  int  $ttl
     */
    public function load(
        string $key,
        $callback,
    ): mixed;

    /**
     * Generate Cache Key
     *
     * @param [type] $tag
     * @return mixed|string
     */
    public function generateKey(
        string|array $name,
    ): string;

    /**
     * Flush Cache Store
     */
    public function flushCache(
        string $tag = '',
        string $action = 'all',
        string $key = ''
    ): void;

    /**
     * With Inertia Lazy Data
     *
     * @param  string  $initialKey
     * @param  string  $tag
     */
    public function withInertia(
        Collection $collection,
    ): array;
}
