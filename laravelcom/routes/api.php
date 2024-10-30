<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::middleware('auth:sanctum')->group(function () {
    Route::middleware('isApiAdmin')->group(function () {
        Route::get('user', [UserController::class, 'index']);
        Route::get('/checkingAuthenticated', function (Request $request) {
            return $request->user() ? response()->json(['authenticated' => true, 'user' => $request->user()], 200) : response()->json(['authenticated' => false], 401);
        });
        Route::get('category', [CategoryController::class, 'index']);
        Route::get('category-edit/{id}', [CategoryController::class, 'show']);
        Route::post('category', [CategoryController::class, 'store']);
        Route::patch('category/{id}', [CategoryController::class, 'update']);
        Route::delete('category-delete/{id}', [CategoryController::class, 'delete']);
    });
    Route::post('/logout',  [UserController::class, 'logoutUser']);
    Route::post('/logout-all-device',  [UserController::class, 'logoutUserAllDevice']);
});
Route::post('/auth/register', [UserController::class, 'createUser']);
Route::post('/auth/login', [UserController::class, 'loginUser']);
