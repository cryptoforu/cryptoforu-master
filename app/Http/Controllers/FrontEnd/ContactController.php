<?php

namespace App\Http\Controllers\FrontEnd;

use App\Http\Controllers\Controller;
use App\Interfaces\FrontEnd\FrontEndInterface;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    /**
     * Contact Controller Instance
     */
    public function __construct(
        protected FrontEndInterface $front,
    ) {

    }

    public function index(): Response
    {
        return Inertia::render(
            component: 'FrontEnd/Contact',
            props: $this->front->contact(),
        );
    }
}
