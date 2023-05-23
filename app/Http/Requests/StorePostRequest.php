<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Services\Blog\Enums\PostStatus;
use Illuminate\Foundation\Http\FormRequest;
use Spatie\Enum\Laravel\Http\Requests\TransformsEnums;
use Spatie\Enum\Laravel\Rules\EnumRule;

final class StorePostRequest extends FormRequest
{
    use TransformsEnums;

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
            'title' => 'required|string',
            'introduction' => 'required|string',
            'content' => 'required|string',
            'featured_image' => 'required|image|mimes:jpg,png,jpeg,gif,svg,webp|max:5048',
            'status' => new EnumRule(PostStatus::class),
            'category_id' => 'required|integer',
            'tags' => 'array',
        ];
    }

    public function enums(): array
    {
        return [
            'status' => PostStatus::class,
        ];
    }
}
