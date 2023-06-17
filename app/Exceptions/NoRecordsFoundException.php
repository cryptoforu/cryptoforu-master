<?php

namespace App\Exceptions;

use App\Responses\ErrorResponse;
use Exception;
use Illuminate\Http\Request;
use JustSteveKing\StatusCode\Http;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class NoRecordsFoundException extends Exception
{
  /**
   * Report the exception.
   */
  public function report(): void
  {
    // ...
  }

  /**
   * Render the exception into an HTTP response.
   */
  public function render(
    NotFoundHttpException $e,
    Request $request
  ): ErrorResponse|bool {
    if ($request->is('api/*')) {
      return new ErrorResponse(
        message: 'Records Not Found',
        exception: $e,
        code: Http::NOT_FOUND
      );
    }
    return false;
  }
}
