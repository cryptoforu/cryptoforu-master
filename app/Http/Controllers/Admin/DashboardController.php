<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Interfaces\Faucetpay\FaucetPayServiceInterface;
use App\Interfaces\Settings\PageInterface;
use Inertia\Inertia;
use Inertia\Response;

final class DashboardController extends Controller
{
  protected PageInterface $page;

  /**
   * Admin Dashboard
   */
  public function __construct(
    PageInterface $page,
    protected FaucetPayServiceInterface $service,
  ) {
    $this->page = $page;
  }

  /**
   * @return Response
   */
  public function index(): Response
  {
    return Inertia::render(
      component: 'Admin/Dashboard',
      props: $this->page->admin_meta(),
    );
  }
}
