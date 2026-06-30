<?php

use Illuminate\Support\Facades\Route;

/*
| This project is a pure API backend (consumed by the React SPA in /frontend).
| This route only exists so visiting the root URL in a browser confirms
| the Laravel server itself is running.
*/
Route::get('/', function () {
    return response()->json([
        'success' => true,
        'message' => 'CodeBricks API is running. See /api/v1/* for endpoints.',
        'data' => [
            'docs' => 'See README.md for the full API reference.',
        ],
    ]);
});
