<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Interfaces\Settings\PageInterface;
use Inertia\Inertia;
use Inertia\Response;

final class DashboardController extends Controller
{
    protected $page;

    /**
     * Admin Dashboard
     */
    public function __construct(
        PageInterface $page
    ) {
        $this->page = $page;
    }

    public function index(): Response
    {
        return Inertia::render(
            component: 'Admin/Dashboard',
            props: [
                'meta' => $this->page->getPageMeta(
                    page_type: 'admin',
                    page: 'dashboard'
                ),
            ]
        );
    }
}
