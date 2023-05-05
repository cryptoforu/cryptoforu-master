<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Services\Earn\Enums\FeaturedEnum;
use Illuminate\Foundation\Http\FormRequest;
use Spatie\Enum\Laravel\Rules\EnumRule;

class UpdateEarnRequest extends FormRequest
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
            'title' => 'string',
            'content' => 'string',
            'image' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg,webp|max:5048',
            'link' => 'string',
            'featured' => new EnumRule(FeaturedEnum::class),
            'earn_category_id' => 'integer',
        ];
    }

    public function enums(): array
    {
        return [
            'featured' => FeaturedEnum::class,
        ];
    }
}
