<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Settings;

use App\Http\Controllers\Controller;
use App\Interfaces\Library\LibraryActionsInterface;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

final class AddSettingsController extends Controller
{
  public function __construct(
    protected LibraryActionsInterface $action,
  ) {

  }

  /**
   * Handle the incoming request.
   */
  public function __invoke(Request $request): RedirectResponse
  {

    if ($request->hasFile('image')) {
      $img = $this->action->store(
        file: $request->file('image'),
        directory: 'misc'
      );
    }
    $data = $request->collect()->except(['image'])->all();
    $key = uniqid('', true);
    try {
      if (settings()->has($request->input('id'))) {
        try {
          settings()->push(
            $request->input('id'),
            [
              $key => [
                'image' => $img['file_name'],
                ...$data,
              ],
            ]
          );
        } catch (NotFoundExceptionInterface|ContainerExceptionInterface $e) {
        }

      } else {
        try {
          settings()->put(
            $request->input('id'),
            [
              $key => [
                'image' => $img['file_name'],
                ...$data,
              ],
            ]
          );
        } catch (NotFoundExceptionInterface|ContainerExceptionInterface $e) {
        }
      }
    } catch (NotFoundExceptionInterface|ContainerExceptionInterface $e) {
    }

    return back()->with('success', 'Stored values successfully');
  }
}
