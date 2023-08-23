<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    protected array $allowedRoutes = [
      'api/placeholder/*',
      'api/count-views/*',
    ];

    /**
     * Handle an incoming request.
     *
     * @param  Request  $request
     * @param  Closure(Request): (Response)  $next
     *
     * @return Response
     * @throws AuthorizationException
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->is(...$this->allowedRoutes)) {
            return $next($request);
        }
        Gate::authorize('view-resource', [$request->user()]);

        return $next($request);
    }
}
