<?php

declare(strict_types=1);

namespace App\Exceptions;

use App\Responses\ErrorResponse;
use Exception;
use Illuminate\Http\Request;
use JustSteveKing\StatusCode\Http;
use Symfony\Component\HttpKernel\Exception\HttpException;

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
    HttpException $e,
    Request $request
  ): ErrorResponse|bool {
    if ($request->is('api/*')) {
      return new ErrorResponse(
        message: 'Records Not Found',
        code: Http::NOT_FOUND()
      );
    }

    return false;
  }
}
