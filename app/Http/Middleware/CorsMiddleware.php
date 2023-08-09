<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CorsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ('OPTIONS' === $request->method()) {
            $next($request)
                ->header(
                    'Access-Control-Allow-Methods',
                    'GET, POST, PUT, DELETE'
                )
            ;

            return $next($request)->setStatusCode(200);
        }

        return $next($request)
            ->header('Access-Control-Allow-Origin', '*')
            ->header(
                'Access-Control-Allow-Methods',
                'GET, POST, PUT, DELETE, OPTIONS'
            )
            ->header(
                'Access-Control-Allow-Headers',
                'X-Requested-With, Content-Type, X-Token-Auth, Authorization'
            )
        ;
    }
}