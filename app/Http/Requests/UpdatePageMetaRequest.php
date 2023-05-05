<?php

declare (strict_types = 1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePageMetaRequest extends FormRequest
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
            'label' => 'string',
            'route' => 'string',
            'meta_desc' => 'string|max:180',
            'meta_image' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg,webp|max:5048',
            'tw_image' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg,webp|max:5048',
            'og_image' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg,webp|max:5048',
            'parent_id' => 'integer',
            'page_name' => 'string',
            'page_type' => 'string',
        ];
    }
}
