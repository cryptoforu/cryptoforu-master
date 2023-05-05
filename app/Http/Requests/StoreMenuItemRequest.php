<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMenuItemRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'label' => 'required|string',
            'route' => 'required|string',
            'icon' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg,webp|max:5048',
            'parent_id' => 'integer',
            'menu_id' => 'integer',
        ];
    }
}
