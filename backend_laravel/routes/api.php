<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleController;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('article/trash', [ArticleController::class, 'trash']);
Route::put('article/{id}/restore', [ArticleController::class, 'restore']);
Route::delete('article/{id}/force-delete', [ArticleController::class, 'forceDelete']);

Route::resource('article', ArticleController::class)->only(['create', 'index', 'store', 'show', 'update', 'destroy']);
