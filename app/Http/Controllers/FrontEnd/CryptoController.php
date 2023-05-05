<?php

namespace App\Http\Controllers\FrontEnd;

use App\Http\Controllers\Controller;
use App\Interfaces\FrontEnd\FrontEndInterface;
use Inertia\Inertia;
use Inertia\Response;

class CryptoController extends Controller
{

    /**
     * Crypto Controller Instance
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
            component:'FrontEnd/Crypto/CryptoIndex',
            props:$this->front->crypto(),
        );
    }

    public function news(): Response
    {
        return Inertia::render(
            component:'FrontEnd/Crypto/News'
        );
    }

    public function markets(): Response
    {
        return Inertia::render(
            component:'FrontEnd/Crypto/Markets',
            props:$this->front->markets(),
        );
    }
}
