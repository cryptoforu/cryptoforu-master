<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

final class StoreEarnRequest extends FormRequest
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
      'title' => 'required|string',
      'content' => 'required|string',
      'main_features' => 'required|string',
      'image' => 'required|image|mimes:jpg,png,jpeg,gif,svg,webp|max:5048',
      'link' => 'required|string',
      'featured' => 'required|boolean',
      'earn_category_id' => 'required|integer',
    ];
  }
}
