<?php

use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CheckoutController;
use App\Http\Controllers\Api\FrontendController;
use App\Http\Controllers\Api\ProductController;
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
        // product route 
        Route::prefix('product')->group(function () {
            Route::get('/', [ProductController::class, 'index']);
            Route::get('{id}', [ProductController::class, 'show']);
            Route::post('/', [ProductController::class, 'store']);
            Route::patch('{id}', [ProductController::class, 'update']);
            Route::delete('{id}', [ProductController::class, 'delete']);
        });

        // // upload image
        // Route::prefix('upload')->group(function(){
        //     Route::post('/image',[ProductController::class,"uploadFile"]);
        // });
    });
    Route::post('/logout',  [UserController::class, 'logoutUser']);
    Route::post('/logout-all-device',  [UserController::class, 'logoutUserAllDevice']);
});
Route::prefix('frontend')->group(function () {
    Route::get('/category', [FrontendController::class, 'category']);
    Route::get('/products/{slug}', [FrontendController::class, 'product']);
    Route::get('/products/{category}/{product}', [FrontendController::class, 'productDetails']);
    Route::post('/add-to-cart', [CartController::class, 'addCart']);
    Route::get('/cart', [CartController::class, 'viewCart']);
    Route::patch('/cart-update-quantity/{cart_id}/{scope}', [CartController::class, 'updateQuantity']);
    Route::delete('/delete-cart-item/{cart_id}', [CartController::class, 'deleteItem']);
    Route::post('/place-order', [CheckoutController::class, 'placeOrder']);
    Route::post('/validate-order', [CheckoutController::class, 'validateOrder']);
});
Route::post('/auth/register', [UserController::class, 'createUser']);
Route::post('/auth/login', [UserController::class, 'loginUser']);
