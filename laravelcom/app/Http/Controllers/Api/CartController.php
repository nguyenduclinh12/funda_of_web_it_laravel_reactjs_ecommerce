<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;

class CartController extends Controller
{
    public function addCart(Request $request)
    {
        try {
            if (auth('sanctum')->check()) {
                $user_id = auth('sanctum')->user()->id;
                $product_id = $request->input('product_id');
                $product_qty = $request->input('product_qty');
                $productCheck = Product::where('id', $product_id)->first();
                if ($productCheck) {
                    if (Cart::where('product_id', $product_id)->where('user_id', $user_id)->exists()) {
                        return response()->json([
                            'status' => 409,
                            'message' => $productCheck->name . ' Already added to cart',
                        ]);
                    } else {
                        $cartItem = new Cart();
                        $cartItem->user_id = $user_id;
                        $cartItem->product_id = $product_id;
                        $cartItem->product_qty = $product_qty;
                        $cartItem->save();
                        return response()->json([
                            'status' => 201,
                            'message' => 'Added to cart',
                        ]);
                    }
                } else {
                    return response()->json([
                        'status' => 404,
                        'message' => 'Product not Found',
                    ]);
                }
            } else {
                return response()->json([
                    'status' => 409,
                    'message' => "Login to Add to Cart",
                ]);
            }
        } catch (HttpException $ex) {
            return response()->json([
                'status' => 500,
                'message' => $ex->getMessage(),
            ]);
        }
    }
    public function viewCart()
    {
        try {
            $userId = auth('sanctum')->user()->id;
            $cartItems = Cart::where('user_id', $userId)->get();
            return $cartItems;
            if ($cartItems) {
                return response()->json([
                    'status' => 201,
                    'cart' => $cartItems,
                ]);
            }
            abort(422, $cartItems);
        } catch (HttpException $ex) {
            return response()->json([
                'status' => 500,
                'errors' => $ex->getMessage(),
            ]);
        }
    }
    public function updateQuantity($cart_id, $scope)
    {
        try {
            if (auth('sanctum')->check()) {
                $user_id = auth('sanctum')->user()->id;
                $cartItem = Cart::where('id', $cart_id)->where('user_id', $user_id)->first();
                if ($cartItem) {
                    if ($scope == 'inc') {
                        $cartItem->product_qty += 1;
                    } else if ($scope == 'dec') {
                        $cartItem->product_qty -= 1;
                    }

                    if ($cartItem->save()) {
                        return response()->json([
                            'status' => 200,
                            'message' => "Quantity Updated",
                        ]);
                    }
                    abort(422, $cartItem);
                }
            }
        } catch (HttpException $ex) {
            return response()->json([
                'status' => 500,
                'errors' => $ex->getMessage(),
            ]);
        }
    }
    public function deleteItem($cart_id = null)
    {
        try {
            if (auth('sanctum')->check()) {
                $userId = auth('sanctum')->user()->id;
                $cartItem = Cart::where('id', $cart_id)->where('user_id', $userId)->first();
                if ($cartItem) {
                    $cartItem->delete();
                    return response()->json([
                        'status' => 200,
                        'message' => "Cart Item Delete Success",
                    ]);
                }
                return response()->json([
                    'status' => 404,
                    'errors' => "Cart Item not Found",
                ]);
            }
            if (empty($cart_id)) {
                return response()->json([
                    'status' => 404,
                    'errors' => "Missing Cart Item Id",
                ]);
            }
        } catch (HttpException $ex) {
            return response()->json([
                'status' => 500,
                'errors' => $ex->getMessage(),
            ]);
        }
    }
}
