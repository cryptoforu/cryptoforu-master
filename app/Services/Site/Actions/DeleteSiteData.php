<?php

declare(strict_types=1);

namespace App\Services\Site\Actions;

use App\Interfaces\Site\DeleteDataContract;
use App\Models\Site;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

final class DeleteSiteData implements DeleteDataContract
{
    /**
     * Delete Data
     */
    public function handle(Request $request): void
    {
        $validator = Validator::make($request->all(), [
            'data_name' => 'required|string',
            'key' => 'required|string',
            'id' => 'required|string',
        ]);
        $validated = $validator->validated();

        $model = Site::ofData($validated['data_name']);
        $collection = collect($model->data_values[$validated['key']]);
        $filtered = $collection->reject(fn ($item, $key) => $item['id'] === $validated['id']);
        $updated = $filtered->whenEmpty(fn () => $model->data_values->forget($validated['key']), function () use ($model, $validated, $collection) {
            $model->data_values[$validated['key']] = $collection;

            return $model->data_values;
        });
        $model->data_values = $updated;
        cache()->store('site')->clear();
        $model->save();
    }
}
