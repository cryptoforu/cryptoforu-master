<?php

declare(strict_types=1);

namespace App\Services\Site\Actions;

use App\Interfaces\Site\DeleteDataContract;
use App\Models\Site;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DeleteSiteData implements DeleteDataContract
{
    /**
     * Delete Data
     *
     * @return void
     */
    public function handle(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'data_name' => 'required|string',
            'key' => 'required|string',
            'id' => 'required|string',
        ]);
        $validated = $validator->validated();

        $model = Site::ofData($validated['data_name']);
        $collection = collect($model->data_values[$validated['key']]);
        $filtered = $collection->reject(function ($item, $key) use ($validated) {
            return $item['id'] === $validated['id'];
        });
        $updated = $filtered->whenEmpty(function () use ($model, $validated) {
            return $model->data_values->forget($validated['key']);
        }, function () use ($model, $validated, $collection) {
            $model->data_values[$validated['key']] = $collection;

            return $model->data_values;
        });
        $model->data_values = $updated;
        cache()->store('site')->clear();
        $model->save();
    }
}
