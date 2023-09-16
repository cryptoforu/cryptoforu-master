<?php

declare(strict_types=1);

namespace App\Actions\SocialAuth;

final class CreateProvider
{
    public function create($userCreated, $user, $provider): void
    {
        $userCreated->providers()->updateOrCreate(
            [
                'provider' => $provider,
                'provider_id' => $user->getId(),
            ],
            [
                'avatar' => $user->getAvatar(),
            ]
        );
    }
}
