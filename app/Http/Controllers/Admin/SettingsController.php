<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMenuItemRequest;
use App\Http\Requests\StorePageRequest;
use App\Http\Requests\UpdateMenuItemRequest;
use App\Interfaces\Settings\ActionContracts\StoreMenuItemContract;
use App\Interfaces\Settings\ActionContracts\UpdateMenuItemContract;
use App\Interfaces\Settings\SettingsActionInterface;
use App\Interfaces\Settings\SettingsInterface;
use App\Responses\ErrorResponse;
use App\Services\Settings\Enums\ActionEnum;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

final class SettingsController extends Controller
{
    /**
     * Undocumented variable
     *
     * @var SettingsInterface
     * @var SettingsActionInterface
     */
    protected SettingsActionInterface|SettingsInterface $settings;

    protected SettingsActionInterface $action;

    /**
     * Settings Controller Instance
     */
    public function __construct(
      SettingsInterface $settings,
      SettingsActionInterface $action,
      private readonly UpdateMenuItemContract $updateMenu,
      private readonly StoreMenuItemContract $menuStore,
    ) {
        $this->settings = $settings;
        $this->action = $action;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render(
          component: 'Admin/Settings/SettingsIndex',
          props: $this->settings->forIndex()
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render(
          component: 'Admin/Settings/Create',
          props: $this->settings->forCreate()
        );
    }

    public function action(
      StorePageRequest $from,
      ActionEnum $action,
    ): RedirectResponse {
        $this->action->store(
          from: $from,
          action: $action
        );

        return to_route('admin.settings.index')->with(
          'success',
          'Stored Settings Successfully'
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMenuItemRequest $request): RedirectResponse
    {
        $this->menuStore->handle(
          from: $request,
        );

        return back()->with('success', 'Stored Settings Successfully');
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
     * Update Menu Item
     */
    public function updateMenu(
      UpdateMenuItemRequest $request,
      string|int $id,
    ): ErrorResponse|RedirectResponse {
        try {
            $update = $this->updateMenu->handle(
              request: $request,
              id: $id
            );
        } catch (Throwable $e) {
            session(['warning', 'Something Went Wrong']);

            return new ErrorResponse(message: [$e->getMessage()]);
        }
        if (!$update) {
            return back()->with('error', 'Something Went Wrong');
        }

        return back()->with('success', 'Updated Succesfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(): void
    {
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(
      Request $request,
      string $id
    ): RedirectResponse|ErrorResponse {
        try {
            $del = $this->action->destroy(
              request: $request,
              id: $id,
            );
        } catch (Throwable $e) {
            session(['warning', 'Something Went Wrong']);

            return new ErrorResponse(message: [$e->getMessage()]);
        }
        if (!$del) {
            return back()->with('error', 'Something Went Wrong');
        }

        return back()->with('success', 'Deleted Successfully');
    }
}
