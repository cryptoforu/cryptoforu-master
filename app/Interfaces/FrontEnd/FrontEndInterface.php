<?php

declare(strict_types=1);

namespace App\Interfaces\FrontEnd;

interface FrontEndInterface
{
    /**
     * Home Page Data
     */
    public function home(): array;

    /**
     * Earn Crypto Page Data
     */
    public function earn(): array;

    /**
     * Faucets List Page Data
     */
    public function list(): array;

    /**
     * Learn Crypto Page Data
     */
    public function learn(): array;

    /**
     * Crypto Page Data
     */
    public function crypto(): array;

    /**
     * Crypto News Page Data
     */
    public function news(): array;

    /**
     * Crypto Markets Page Data
     */
    public function markets(): array;

    /**
     * Contact Page Data
     */
    public function contact(): array;
}
