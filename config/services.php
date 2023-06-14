<?php

declare(strict_types=1);

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
     */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
        'scheme' => 'https',
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],
    'coingecko' => [
        'base_url' => env('COINGECKO_BASE_URL', 'https://api.coingecko.com/api/v3/'),
        'timeout' => env('COINGECKO_TIMEOUT', 10),
        'connect_timeout' => env('COINGECKO_CONNECTION_TIMEOUT', 2),
    ],
    'coinstats' => [
        'base_url' => env('COINSTATS_BASE_URL', 'https://api.coinstats.app/public/v1/'),
    ],
    'descrypt' => [
        'base_url' => env('DECRYPT_BASE_URL', 'https://decrypt.co/feed'),
    ],

];
