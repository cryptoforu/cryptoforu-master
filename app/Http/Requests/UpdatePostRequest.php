<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Services\Blog\Enums\PostStatus;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use Spatie\Enum\Laravel\Rules\EnumRule;

final class UpdatePostRequest extends FormRequest
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
      'title' => 'string',
      'introduction' => 'string',
      'content' => 'string',
      'featured_image' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg,webp|max:5048',
      'status' => new EnumRule(PostStatus::class),
      'category_id' => 'integer',
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
