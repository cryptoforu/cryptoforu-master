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
        'base_url' => env(
            'COINGECKO_BASE_URL',
            'https://api.coingecko.com/api/v3/'
        ),
        'timeout' => env('COINGECKO_TIMEOUT', 10),
        'connect_timeout' => env('COINGECKO_CONNECTION_TIMEOUT', 2),
    ],
    'coinstats' => [
        'base_url' => env(
            'COINSTATS_BASE_URL',
            'https://api.coinstats.app/public/v1/'
        ),
    ],
    'descrypt' => [
        'base_url' => env('DECRYPT_BASE_URL', 'https://decrypt.co/feed'),
    ],
    'github' => [
        'client_id' => env('GITHUB_CLIENT_ID'),
        'client_secret' => env(
            'GITHUB_CLIENT_SECRET'
        ),
        'redirect' => env(
            'GITHUB_REDIRECT_URI',
            'http://localhost:80/login/github/callback'
        ),
    ],
    'facebook' => [
        'client_id' => env('FACEBOOK_CLIENT_ID'),
        'client_secret' => env('FACEBOOK_CLIENT_SECRET'),
        'redirect' => 'FACEBOOK_REDIRECT_URI',
    ],
    'google' => [
        'client_id' => env(
            'GOOGLE_CLIENT_ID'
        ),
        'client_secret' => env(
            'GOOGLE_CLIENT_SECRET'
        ),
        'redirect' => env(
            'GOOGLE_REDIRECT_URI',
            'http://localhost:80/login/google/callback'
        ),
    ],
    'faucet-pay' => [
        'base_url' => env(
            'FAUCETPAY_BASE_URL',
            'https://faucetpay.io/api/'
        ),
        'api_key' => env(
            'FAUCETPAY_API_KEY'
        ),
    ],
];
