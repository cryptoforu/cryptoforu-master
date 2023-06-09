<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Settings;

use App\Http\Controllers\Controller;
use App\Interfaces\Library\LibraryActionsInterface;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

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
        if (settings()->has($request->input('id'))) {
            $key = uniqid('', true);
            settings()->push(
                $request->input('id'),
                [
                    $key => [
                        'image' => $img['file_name'],
                        ...$data,
                    ],
                ]
            );

        } else {
            $key = uniqid('', true);
            settings()->put(
                $request->input('id'),
                [
                    $key => [
                        'image' => $img['file_name'],
                        ...$data,
                    ],
                ]
            );
        }

        return back()->with('success', 'Stored values successfuly');
    }
}
