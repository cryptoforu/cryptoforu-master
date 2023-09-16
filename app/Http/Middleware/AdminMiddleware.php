<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpFoundation\Response;

final class AdminMiddleware
{
  private array $allowedRoutes = [
    'api/placeholder/*',
    'api/count-views/*',
    'api/test',
  ];

  /**
   * Handle an incoming request.
   *
   * @param  Closure(Request): (Response)  $next
   *
   * @throws AuthorizationException
   */
  public function handle(Request $request, Closure $next): Response
  {

    if ($request->is(...$this->allowedRoutes)) {
      return $next($request);
    }

    if ($request->is('api/*') && Auth::check()) {
      Gate::authorize('view-resource', [$request->user()]);

      return $next($request);
    }

    return $next($request);
  }
}
