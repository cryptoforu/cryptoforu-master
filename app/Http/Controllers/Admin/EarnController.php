<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEarnRequest;
use App\Http\Requests\UpdateEarnRequest;
use App\Interfaces\Earn\EarnActionInterface;
use App\Interfaces\Earn\EarnServiceInterface;
use App\Models\Earn;
use App\Responses\RedirectSuccess;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

final class EarnController extends Controller
{
  /**
   * Earn Controller Instance
   */
  public function __construct(
    protected EarnServiceInterface $earn,
    protected EarnActionInterface $action,
  ) {
  }

  /**
   * Display a listing of the resource.
   */
  public function index(): Response
  {
    return Inertia::render(
      component: 'Admin/Earn/EarnIndex',
      props: $this->earn->forIndex(),
    );
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create(): Response
  {
    return Inertia::render(
      component: 'Admin/Earn/EarnCreate',
      props: $this->earn->forCreate(),
    );
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreEarnRequest $request
  ): RedirectSuccess|RedirectResponse {
    try {
      $this->action->store(
        request: $request,
      );

      return new RedirectSuccess(
        url: 'admin-earn.index',
        message: 'Added New Method Succesfully'
      );
    } catch (Throwable $e) {
      report($e);

      return back()->with('error', 'Something Went Wrong');
    }

  }

  /**
   * Display the specified resource.
   */
  public function show(Earn $earn): void
  {
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Earn $earn): Response
  {
    return Inertia::render(
      component: 'Admin/Earn/EarnEdit',
      props: $this->earn->forEdit(
        earn: $earn,
      )
    );
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(
    UpdateEarnRequest $request,
    Earn $earn
  ): RedirectSuccess {
    $this->action->update(
      request: $request,
      earn: $earn,
    );

    return new RedirectSuccess(
      url: 'admin-earn.index',
      message: 'Updated Successfully'
    );
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Earn $earn): RedirectResponse|RedirectSuccess
  {
    try {
      $this->action->destroy(
        earn: $earn,
      );

      return new RedirectSuccess(
        url: 'admin-earn.index',
        message: 'Deleted Successfully',
      );
    } catch (Throwable $e) {
      report($e);

      return back()->with('error', 'Something Went Wrong');
    }
  }
}
