<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;

final class ApiRequestPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
    }

    public function viewResource(User $user): Response
    {
        return $user->tokenCan('admin') ?
          Response::allow() :
          Response::denyAsNotFound('You are not authorized for this request');
    }
}
