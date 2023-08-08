<?php

declare(strict_types=1);

return [

  /*
|--------------------------------------------------------------------------
| Name of route
|--------------------------------------------------------------------------
|
| Enter the routes name to enable dynamic imagecache manipulation.
| This handle will define the first part of the URI:
|
| {route}/{template}/{filename}
|
| Examples: "images", "img/cache"
|
*/

  'route' => 'api/img/cache',

  /*
|--------------------------------------------------------------------------
| Storage paths
|--------------------------------------------------------------------------
|
| The following paths will be searched for the image filename, submitted
| by URI.
|
| Define as many directories as you like.
|
*/

  'paths' => [
    public_path('storage'),
    public_path('images'),
    public_path('images/Backgrounds'),
    public_path('images/menu_icons'),
    public_path('images/meta'),
    public_path('images/posts'),
    public_path('images/categories'),
    public_path('images/earning'),
    public_path('images/misc'),
    public_path('images/front_images/home/Conversions'),
    public_path('images/front_images/home'),
    public_path('images/coins'),
  ],

  /*
|--------------------------------------------------------------------------
| Manipulation templates
|--------------------------------------------------------------------------
|
| Here you may specify your own manipulation filter templates.
| The keys of this array will define which templates
| are available in the URI:
|
| {route}/{template}/{filename}
|
| The values of this array will define which filter class
| will be applied, by its fully qualified name.
|
*/

  'templates' => [
    'small' => 'Intervention\Image\Templates\Small',
    'medium' => 'Intervention\Image\Templates\Medium',
    'large' => 'Intervention\Image\Templates\Large',
    'meta' => 'App\Services\Library\ImageFilters\MetaFilter',
    'sm' => 'App\Services\Library\ImageFilters\SmFilter',
    'md' => 'App\Services\Library\ImageFilters\MdFilter',
    'lg' => 'App\Services\Library\ImageFilters\LgFilter',
    'pnglg' => 'App\Services\Library\ImageFilters\PngLarge',
    'pngmd' => 'App\Services\Library\ImageFilters\PngMedium',
    'pngsm' => 'App\Services\Library\ImageFilters\PngSmall',
    'upsize' => 'App\Services\Library\ImageFilters\UpsizeFilter',
    'data-image' => 'App\Services\Library\ImageFilters\BlurDataImage',
    'aspect-height' => 'App\Services\Library\ImageFilters\AspectHeight',
    'icon' => 'App\Services\Library\ImageFilters\IconFilter'
  ],

  /*
|--------------------------------------------------------------------------
| Image Cache Lifetime
|--------------------------------------------------------------------------
|
| Lifetime in minutes of the images handled by the imagecache route.
|
*/

  'lifetime' => 43200,

];
