<?php

namespace App\Http\Controllers\FrontEnd;

use App\Http\Controllers\Controller;
use App\Interfaces\FrontEnd\FrontEndInterface;
use Inertia\Inertia;
use Inertia\Response;

class LearnCryptoController extends Controller
{
/**
 * Learn Crypto Instance
 *
 * @param FrontEndInterface $front
 */
    public function __construct(
        protected FrontEndInterface $front,
    ) {

    }

    public function index(): Response
    {
        return Inertia::render(
            component:'FrontEnd/Learn/LearnIndex',
            props:$this->front->learn(),
        );
    }
}
