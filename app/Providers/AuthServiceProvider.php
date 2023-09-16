<?php

declare(strict_types=1);

namespace App\Providers;

use App\Models\User;
use App\Policies\ApiRequestPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

final class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [

    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {

        $this->registerPolicies();
        Gate::before(static fn (User $user) => (bool) ('super-admin' === $user->roles()->value('name')));
        Gate::define(
            'view-resource',
            [ApiRequestPolicy::class, 'viewResource']
        );
    }
}
