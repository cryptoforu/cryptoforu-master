<?php
namespace App\Responses;

use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Response;
use Throwable;

class ErrorResponse implements Responsable
{
    public function __construct(
        private string $message,
        private  ? Throwable $exception = null,
        private int $code = Response::HTTP_INTERNAL_SERVER_ERROR,
        private array $headers = []
    ) {}

    public function toResponse($request)
    {
        $response = ['message' => $this->message];

        if (!is_null($this->exception) && config('app.debug')) {
            $response['debug'] = [
                'message' => $this->exception->getMessage(),
                'file' => $this->exception->getFile(),
                'line' => $this->exception->getLine(),
                'trace' => $this->exception->getTraceAsString(),
            ];
        }

        return response()->json($response, $this->code, $this->headers);
    }
}
