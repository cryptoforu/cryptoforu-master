<?php

declare(strict_types=1);

namespace App\Services\Earn\Actions;

use App\Http\Requests\UpdateEarnRequest;
use App\Interfaces\Library\LibraryActionsInterface;
use App\Models\Earn;
use App\Traits\Imageable;
use Illuminate\Support\Str;

final readonly class UpdateEarn
{
  use Imageable;

  /**
   * @param  LibraryActionsInterface  $library
   */
  public function __construct(
    private LibraryActionsInterface $library,
  ) {
  }

  /**
   * @param  UpdateEarnRequest  $request
   * @param  Earn  $earn
   * @return bool
   * Update earning Methods
   */
  public function handle(UpdateEarnRequest $request, Earn $earn): bool
  {
    $validated = $request->validated();

    $image = $this->check_image(
      img: $request->validated('image'),
      directory: 'earning'
    );
    if (!is_null($image)) {
      $earn->image = $image['image_url'];
      $earn->image_name = $image['file_name'];
      if (!empty($earn->images)) {
        foreach ($earn->images as $img) {
          $this->library->delete($img);
        }
        $this->library->new(
          model: $earn,
          file: $image,
          category: 3,
        );
      }
    }

    $request->collect()->except(['_method'])->map(function ($item, $key) use (
      $earn
    ): void {
      $earn->{$key} = $item;
    });
    if (empty($request->safe())) {
      return false;
    }
    $earn->slug = Str::slug($validated['title']);
    $earn->save();

    return true;
  }
}
