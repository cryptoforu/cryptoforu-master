<?php

declare(strict_types=1);

namespace App\Actions\SocialAuth;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

final class CreateNewUser
{
    public function create(
        $user
    ): Model|Builder|User {
        return User::query()->firstOrCreate(
            [
                'email' => $user->getEmail(),
            ],
            [
                'email_verified_at' => now(),
                'name' => $user->getName(),
                'status' => true,
            ]
        );
    }
}
