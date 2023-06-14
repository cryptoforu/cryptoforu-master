<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdatePageMetaRequest;
use App\Interfaces\Library\LibraryActionsInterface;
use App\Models\Page;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Arr;

final class UpdateMetaController extends Controller
{
  public function __construct(
    protected LibraryActionsInterface $library,
  ) {

  }

  /**
   * Handle the incoming request.
   */
  public function __invoke(
    UpdatePageMetaRequest $request,
    Page $page
  ): RedirectResponse {

    $validated = $request->validated();
    $images = $request->allFiles();
    Arr::map($images, function ($img, $key) use ($page): void {
      $paths = $this->library->store(
        file: $img,
        directory: 'meta'
      );
      $page->{$key} = (string) (config('app.url').'/'.$paths['path']);

      if (!empty($page->images)) {
        foreach ($page->images as $file) {
          $this->library->delete($file);
        }
        $this->library->new(
          model: $page,
          file: $paths,
          category: 8,
        );
      }
    });
    $page->label = $validated['label'];
    $page->meta_desc = $validated['meta_desc'];
    $page->route = $validated['route'];
    $page->parent_id = $validated['parent_id'];
    $page->page_type = $validated['page_type'];
    $page->page_name = $validated['page_name'];
    cache()->store('library')->clear();
    $page->save();

    return back()->with('success', 'Updated Meta Succsfully');
  }
}
