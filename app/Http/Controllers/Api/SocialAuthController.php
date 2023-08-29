<?php

/** @noinspection ALL */

/** @noinspection ALL */

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Actions\SocialAuth\CreateNewUser;
use App\Actions\SocialAuth\CreateProvider;
use App\Http\Controllers\Controller;
use App\Responses\ErrorResponse;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use JustSteveKing\StatusCode\Http;
use Laravel\Socialite\Facades\Socialite;

final class SocialAuthController extends Controller
{
    /**
     * Social Authentication
     */
    public function __construct(
        protected CreateNewUser $createNewUser,
        protected CreateProvider $createProvider
    ) {
    }

    /**
     * Redirect the user to the Provider authentication page.
     */
    public function redirectToProvider(
        $provider
    ): ErrorResponse|RedirectResponse {
        $validate = $this->validateProvider($provider);
        if ( ! $validate
        ) {
            return $validate;
        }

        return Socialite::driver($provider)->stateless()->redirect();
    }

    protected function validateProvider(
        $provider
    ): bool|ErrorResponse {
        if ( ! in_array($provider, ['facebook', 'github', 'google'])) {
            return new ErrorResponse(
                message: ['message' => 'Please login using facebook, github or google'],
                code: Http::UNPROCESSABLE_ENTITY
            );
        }

        return true;
    }

    /**
     * Obtain the user information from Provider.
     */
    public function handleProviderCallback(
        $provider
    ): ErrorResponse|JsonResponse|RedirectResponse|Response {
        $validated = $this->validateProvider($provider);
        if ( ! $validated
        ) {
            return $validated;
        }
        try {
            $user = Socialite::driver($provider)->stateless()->user();
        } catch (ClientException $exception) {
            return new ErrorResponse([
                'message' => 'Invalid credentials provided.',
            ], Http::UNPROCESSABLE_ENTITY);
        }

        $userCreated = $this->createNewUser->create($user);

        if ($userCreated->admin()) {
            $userCreated->roles()->sync(['1']);
            $this->createProvider->create(
                userCreated: $userCreated,
                user: $user,
                provider: $provider
            );
            auth()->login($userCreated);
        }
        $userCreated->roles()->attach('4');
        $this->createProvider->create(
            userCreated: $userCreated,
            user: $user,
            provider: $provider
        );
        $token = $userCreated->createToken(
            'social_guest',
            ['reader']
        )->plainTextToken;

        return response()->json($userCreated, 200, ['Access-Token' => $token]);
    }
}
