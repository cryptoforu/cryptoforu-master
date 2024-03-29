<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

final class UpdateCategoryRequest extends FormRequest
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
   * @return array<string, Rule|array|string>
   */
  public function rules(): array
  {
    return [
      'name' => 'string',
      'description' => 'string',
      'category_image' => 'nullable|image|mimes:png,jpg,webp,svg,gif|max:5048',
    ];
  }
}
