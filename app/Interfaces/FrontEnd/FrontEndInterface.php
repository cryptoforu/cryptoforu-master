<?php
declare (strict_types = 1);
namespace App\Interfaces\FrontEnd;

interface FrontEndInterface
{
/**
 * Home Page Data
 *
 * @return array
 */
    public function home(): array;
    /**
     * Earn Crypto Page Data
     *
     * @return array
     */
    public function earn(): array;

    /**
     * Faucets List Page Data
     *
     * @return array
     */
    public function list(): array;

    /**
     * Learn Crypto Page Data
     *
     * @return array
     */
    public function learn(): array;

    /**
     * Crypto Page Data
     *
     * @return array
     */
    public function crypto(): array;

    /**
     * Crypto News Page Data
     *
     * @return array
     */
    public function news(): array;

    /**
     * Crypto Markets Page Data
     *
     * @return array
     */
    public function markets(): array;

    /**
     * Contact Page Data
     *
     * @return array
     */
    public function contact(): array;
}
