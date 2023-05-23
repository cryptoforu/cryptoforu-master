<?php

declare(strict_types=1);

namespace App\Http\Controllers\FrontEnd;

use App\Http\Controllers\Controller;
use App\Interfaces\FrontEnd\FrontEndInterface;
use Inertia\Inertia;
use Inertia\Response;

final class HomeController extends Controller
{
    public function __construct(
        protected FrontEndInterface $front,
    ) {

    }

    /**
     * Handle the incoming request.
     * Home Page
     */
    public function __invoke(): Response
    {
        return Inertia::render(
            component: 'FrontEnd/Home',
            props: $this->front->home(),
        );
    }
}
