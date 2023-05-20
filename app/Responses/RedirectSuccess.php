<?php
namespace App\Responses;

use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;

class RedirectSuccess implements Responsable
{
    /**
     * Redirect Success Response
     *
     * @param string $url
     * @param string $message
     * @param  int  $code
     * @param array $headers
     */
    public function __construct(
        public readonly string $url,
        public readonly string $message,
        private mixed $parameters = [],
        private int $code = Response::HTTP_FOUND,
        private array $headers = [],
    ) {
    }
    /**
     * Undocumented function
     *
     * @param $request
     * @return RedirectResponse
     */
    public function toResponse($request): RedirectResponse
    {
        return to_route(
            route:$this->url,
            parameters:$this->parameters,
            status:$this->code,
            headers:$this->headers,
        )->with('success', $this->message);
    }

}
