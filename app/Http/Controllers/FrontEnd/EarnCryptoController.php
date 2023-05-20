<?php

namespace App\Http\Controllers\FrontEnd;

use App\Http\Controllers\Controller;
use App\Interfaces\FrontEnd\FrontEndInterface;
use Inertia\Inertia;
use Inertia\Response;

class EarnCryptoController extends Controller
{
    /**
     * Earn Crypto Instance
     */
    public function __construct(
        protected FrontEndInterface $front,
    ) {

    }

    public function index(): Response
    {
        return Inertia::render(
            component: 'FrontEnd/Earn/EarnIndex',
            props: $this->front->earn(),
        );
    }

    public function list(): Response
    {
        return Inertia::render(
            component: 'FrontEnd/Earn/List',
            props: $this->front->list(),
        );
    }
}
