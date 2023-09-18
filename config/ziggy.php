<?php

declare(strict_types=1);

return [
    'groups' => [
        'admin' => ['admin.*', 'verification.*', 'password.*', 'logout', 'user-password.*', 'user-profile-information.*'],
        'front' => ['front.*', 'login', 'register', 'imagecache'],
        'api' => ['site:*', 'blog:*', 'crypto:*', 'earn:*', 'faucetpay:*', 'placeholder', 'count_views', 'ziggy'],
    ],
];
