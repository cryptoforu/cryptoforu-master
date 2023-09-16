<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

final class StoreCategoryRequest extends FormRequest
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
      'name' => 'required|string',
      'description' => 'required|string',
      'category_image' => 'required|image|mimes:png,jpg,webp,gif,svg|max:5048',
    ];
  }
}
