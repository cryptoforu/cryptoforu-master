<?php

declare(strict_types=1);

namespace App\Exceptions;

use App\Responses\ErrorResponse;
use Exception;
use Illuminate\Http\Request;
use JustSteveKing\StatusCode\Http;

final class NoRecordsFoundException extends Exception
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
    Request $request
  ): ErrorResponse|bool {
    if ($request->is('api/*')) {
      return new ErrorResponse(
        message: ['message' => 'Records Not Found'],
        status: Http::NOT_FOUND
      );
    }

    return false;
  }
}
