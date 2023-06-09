<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#00aba9">
    <meta name="theme-color" content="#ffffff">
    <title inertia>{{ config('app.name', 'Cryptoforu') }}</title>
    <link rel="preload" fetchpriority="high" as="image" href="/img/cache/pnglg/6456ab884b1f8Lg.png?w=1200&&q=100" type="image/webp">
    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite('resources/ts/app.tsx')
    @inertiaHead
</head>

<body class="antialiased">
    @inertia
</body>

</html>
