<?php

declare(strict_types=1);

namespace App\Exceptions;

use App\Responses\ErrorResponse;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

final class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [

    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<Throwable>>
     */
    protected $dontReport = [

    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * A list of error messages
     *
     * @var array<int, string>
     */
    protected array $messages = [
        500 => 'Something went wrong',
        503 => 'Service unavailable',
        404 => 'Not found',
        403 => 'Not authorized',
    ];

    /**
     * Render an exception into an HTTP response.
     *
     * @param  Request  $request
     *
     * @throws Throwable
     */
    public function render($request, Throwable $e): Response|ErrorResponse
    {
        $response = parent::render($request, $e);
        $status = $response->getStatusCode();

        if (app()->environment(['local', 'testing'])) {
            return $response;
        }

        if ( ! array_key_exists($status, $this->messages)) {
            return $response;
        }

        if ( ! $request->isMethod('GET')) {
            return back()
                ->setStatusCode($status)
                ->with('error', $this->messages[$status]);
        }

        return Inertia::render('Errors/Index', [
            'status' => $status,
            'message' => $this->messages[$status],
        ])
            ->toResponse($request)
            ->setStatusCode($status);
    }

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(fn (NoRecordsFoundException $e): string => $e->getMessage());

    }

    protected function shouldReturnJson($request, Throwable $e): bool
    {
        return parent::shouldReturnJson($request, $e) || $request->is('api/*');
    }
}
