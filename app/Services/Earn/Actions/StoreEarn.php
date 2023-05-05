<?php

namespace App\Services\Earn\Actions;

use App\Http\Requests\StoreEarnRequest;
use App\Interfaces\Library\LibraryActionsInterface;
use App\Models\Earn;
use Illuminate\Support\Str;

class StoreEarn
{
    public function __construct(
        private readonly LibraryActionsInterface $library,
    ) {
    }

    /**
     * Store New earning Method
     */
    public function handle(StoreEarnRequest $request): bool
    {
        $validated = $request->validated();

        if ($request->hasFile('image')) {
            $image = $this->library->store(
                file:$validated['image'],
                directory:'/earning'
            );
            $image_path = $image['path'];
            $image_name = $image['file_name'];
            $image_thumb = $image['thumb'];
        }

        $earn = Earn::create([
            'title' => $validated['title'],
            'content' => Str::between($validated['content'], '<!-- Content -->', '<!-- Content -->'),
            'slug' => Str::slug($validated['title']),
            'image' => $image_path,
            'thumb' => $image_thumb,
            'link' => $validated['link'],
            'featured' => $validated['featured'],
            'image_name' => $image_name,
            'earn_category_id' => $validated['earn_category_id'],
            'main_features' => Str::between($validated['content'], '<!-- Features -->', '<!-- Features -->'),
        ]);

        $this->library->save(
            model:$earn,
            file:$image,
            category:3
        );

        return true;
    }
}
