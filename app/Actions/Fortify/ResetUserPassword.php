<?php

declare(strict_types=1);

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Laravel\Fortify\Contracts\ResetsUserPasswords;

final class ResetUserPassword implements ResetsUserPasswords
{
  use PasswordValidationRules;

  /**
   * Validate and reset the user's forgotten password.
   *
   * @param  User  $user
   * @param  array<string, string>  $input
   */
  public function reset(User $user, array $input): void
  {
    try {
      Validator::make($input, [
        'password' => $this->passwordRules(),
      ])->validate();
    } catch (ValidationException $e) {
    }

    $user->forceFill([
      'password' => Hash::make($input['password']),
    ])->save();
  }
}
