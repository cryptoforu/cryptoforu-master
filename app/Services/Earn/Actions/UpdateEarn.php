<?php

namespace App\Services\Earn\Actions;

use App\Http\Requests\UpdateEarnRequest;
use App\Interfaces\Library\LibraryActionsInterface;
use App\Models\Earn;
use Illuminate\Support\Str;

class UpdateEarn
{
    public function __construct(
        private readonly LibraryActionsInterface $library,
    ) {
    }

    /**
     * Update Earning Method
     */
    public function handle(UpdateEarnRequest $request, Earn $earn): bool
    {
        $validated = $request->validated();
        if ($request->hasFile('image')) {
            $image = $this->library->store(
                file:$validated['image'],
                directory:'earning'
            );

            $earn->image = $image['path'];
            $earn->image_name = $image['file_name'];
            $earn->thumb = $image['thumb'];
            if (!empty($earn->images)) {
                foreach ($earn->images as $img) {
                    $this->library->delete($img);
                }
                $this->library->new(
                    model:$earn,
                    file:$image,
                    category:3,
                );
            }
        }

        $request->collect()->except(['_method'])->map(function ($item, $key) use ($earn) {
            $earn->$key = $item;
        });
        if (empty($request->safe())) {
            return false;
        }
        $earn->slug = Str::slug($validated['title']);
        $earn->main_features = Str::between($validated['content'], '<!-- Features -->', '<!-- Features -->');
        $earn->content = Str::between($validated['content'], '<!-- Content -->', '<!-- Content -->');
        $earn->save();

        return true;
    }
}
