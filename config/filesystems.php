<?php

use Illuminate\Support\Facades\Storage;

return [

    'default' => env('FILESYSTEM_DISK', 'local'),

    'disks' => [

        'local' => [
            'driver' => 'local',
            'root' => storage_path('app/private'),
            'serve' => true,
            'throw' => false,
        ],

        'public' => [
            'driver' => 'local',
            'root' => storage_path('app/public'),
            'url' => env('APP_URL') . '/storage',
            'visibility' => 'public',
            'throw' => false,
        ],

        /*
        |----------------------------------------------------------------
        | Snippets disk
        |----------------------------------------------------------------
        | Every UI design's index.html / style.css / script.js lives here,
        | organized as: storage/app/snippets/{section-slug}/{design-slug}/
        | This is what SnippetService reads from and writes to.
        |----------------------------------------------------------------
        */
        'snippets' => [
            'driver' => 'local',
            'root' => storage_path('app/snippets'),
            'throw' => false,
        ],

    ],

    'links' => [
        public_path('storage') => storage_path('app/public'),
    ],

];
