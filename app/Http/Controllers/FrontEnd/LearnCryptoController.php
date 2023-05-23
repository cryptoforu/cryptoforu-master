<?php

declare(strict_types=1);

namespace App\Http\Controllers\FrontEnd;

use App\Http\Controllers\Controller;
use App\Interfaces\FrontEnd\FrontEndInterface;
use Inertia\Inertia;
use Inertia\Response;

final class LearnCryptoController extends Controller
{
    /**
     * Learn Crypto Instance
     */
    public function __construct(
        protected FrontEndInterface $front,
    ) {

    }

    public function index(): Response
    {
        return Inertia::render(
            component: 'FrontEnd/Learn/LearnIndex',
            props: $this->front->learn(),
        );
    }
}
