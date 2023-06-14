<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSiteDataRequest;
use App\Interfaces\Site\DeleteDataContract;
use App\Interfaces\Site\SiteInterface;
use App\Interfaces\Site\StoreDataContract;
use App\Responses\RedirectSuccess;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

final class SiteController extends Controller
{
  public function __construct(
    protected StoreDataContract $store,
    protected SiteInterface $site,
    protected DeleteDataContract $delete,
  ) {

  }

  /**
   * Display a listing of the resource.
   */
  public function index(): Response
  {
    return Inertia::render(
      component: 'Admin/Site/SiteIndex',
      props: $this->site->forIndex(),
    );
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create(): Response
  {
    return Inertia::render(
      component: 'Admin/Site/SiteCreate',
      props: $this->site->forCreate(),
    );
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreSiteDataRequest $request): bool|RedirectSuccess
  {
    try {
      $this->store->handle(
        request: $request,
      );

      return new RedirectSuccess(
        url: 'site.index',
        message: 'Stored Data Successfully'
      );
    } catch (Throwable $e) {
      report($e);

      return false;
    }

  }

  /**
   * Display the specified resource.
   */
  public function show(string $id): void
  {

  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(string $id): void
  {

  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id): void
  {

  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id): void
  {

  }

  public function delete(Request $request): RedirectSuccess
  {
    $this->delete->handle(
      request: $request,
    );

    return new RedirectSuccess(
      url: 'site.index',
      message: 'Deleted Data Successfully'
    );
  }
}
