<?php

declare(strict_types=1);

namespace App\Providers;

use App\Actions\Fortify\CreateNewUser;
use App\Actions\Fortify\ResetUserPassword;
use App\Actions\Fortify\UpdateUserPassword;
use App\Actions\Fortify\UpdateUserProfileInformation;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Laravel\Fortify\Contracts\LoginResponse;
use Laravel\Fortify\Contracts\LogoutResponse;
use Laravel\Fortify\Fortify;

final class FortifyServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->instance(
            LoginResponse::class,
            new class() implements LoginResponse
            {
                public function toResponse($request): RedirectResponse
                {
                    $request->session()->regenerate();

                    return redirect()->intended(RouteServiceProvider::HOME)->with(
                        'success',
                        'Logged In Successfully'
                    );
                }
            }
        );
        $this->app->instance(
            LogoutResponse::class,
            new class() implements LogoutResponse
            {
                public function toResponse($request): RedirectResponse
                {
                    $request->session()->invalidate();

                    $request->session()->regenerateToken();

                    return redirect()->intended(route('login'))->with(
                        'success',
                        'Logged Out Successfully'
                    );
                }
            }
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Fortify::createUsersUsing(CreateNewUser::class);
        Fortify::updateUserProfileInformationUsing(UpdateUserProfileInformation::class);
        Fortify::updateUserPasswordsUsing(UpdateUserPassword::class);
        Fortify::resetUserPasswordsUsing(ResetUserPassword::class);

        Fortify::loginView(static function () {
            return inertia(
                'Auth/Login',
                [
                    'title' => 'Admin Login',
                ]
            );
        });
        Fortify::registerView(static function () {
            return inertia(
                'Auth/Register',
                [
                    'title' => 'Admin Register',
                ]
            );
        });
        RateLimiter::for('login', static function (Request $request) {
            $email = (string) $request->email;

            return Limit::perMinute(5)->by($email . $request->ip());
        });

        RateLimiter::for(
            'two-factor',
            static fn (
                Request $request
            ) => Limit::perMinute(5)->by($request->session()->get('login.id'))
        );
    }
}
