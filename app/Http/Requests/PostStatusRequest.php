<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Services\Blog\Enums\PostStatus;
use Illuminate\Foundation\Http\FormRequest;
use Spatie\Enum\Laravel\Http\Requests\TransformsEnums;
use Spatie\Enum\Laravel\Rules\EnumRule;

class PostStatusRequest extends FormRequest
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
            'status' => new EnumRule(PostStatus::class),
        ];
    }

    public function enums(): array
    {
        return [
            'status' => PostStatus::class,
        ];
    }
}
