<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpKernel\Exception\HttpException;

class CheckoutController extends Controller
{
    public function placeOrder(Request $request)
    {
        try {
            if (auth('sanctum')->check()) {
                $validator = Validator::make($request->all(), [
                    'first_name' => 'required|max:191',
                    'last_name' => 'required|max:191',
                    'phone' => 'required|max:191',
                    'email' => 'required|max:191',
                    'address' => 'required|max:191',
                    'city' => 'required|max:191',
                    'state' => 'required|max:191',
                    'zipCode' => 'required|max:191',
                ]);
            }
            if ($validator->fails()) {
                return response()->json([
                    'status' => 422,
                    'errors' => $validator->messages()
                ]);
            } else {
                $user_id = auth('sanctum')->user()->id;
                $order  = new Order();
                $order->user_id = $user_id;
                $order->first_name = $request->first_name;
                $order->last_name = $request->last_name;
                $order->phone = $request->phone;
                $order->email = $request->email;
                $order->address = $request->address;
                $order->city = $request->city;
                $order->state = $request->state;
                $order->zipCode = $request->zipCode;
                $order->remark = "";

                $order->payment_mode = "COD";
                $order->tracking_no = "fundaecom" . mt_rand(1111, 9999);
                if ($order->save()) {
                    $cart = Cart::where('user_id', $user_id)->get();
                    $orderItems = [];
                    foreach ($cart as $item) {
                        $orderItems[] = [
                            'product_id' => $item->product_id,
                            'qty' => $item->product_qty,
                            'price' => $item->product->sale_price,
                        ];
                        $item->product->update([
                            'qty' => $item->product->qty - $item->product_qty
                        ]);
                    }
                    $order->orderItems()->createMany($orderItems);
                    Cart::destroy($cart);
                    return response()->json([
                        'status' => 200,
                        'message' => 'Order Placed successfully'
                    ]);
                } else {
                    abort(422, "Has error when Order Placed");
                }
            }
        } catch (HttpException $ex) {
            return response()->json([
                'status' => 500,
                'errors' => $ex->getMessage()
            ]);
        }
    }
    public function validateOrder(Request $request)
    {
        try {
            if (auth('sanctum')->check()) {
                $validator = Validator::make($request->all(), [
                    'first_name' => 'required|max:191',
                    'last_name' => 'required|max:191',
                    'phone' => 'required|max:191',
                    'email' => 'required|max:191',
                    'address' => 'required|max:191',
                    'city' => 'required|max:191',
                    'state' => 'required|max:191',
                    'zipCode' => 'required|max:191',
                ]);
            }
            if ($validator->fails()) {
                return response()->json([
                    'status' => 422,
                    'errors' => $validator->messages()
                ]);
            } else {

                return response()->json([
                    'status' => 200,
                    'message' => 'Form Validated successfully'
                ]);
            }
        } catch (HttpException $ex) {
            return response()->json([
                'status' => 500,
                'errors' => $ex->getMessage()
            ]);
        }
    }
}
