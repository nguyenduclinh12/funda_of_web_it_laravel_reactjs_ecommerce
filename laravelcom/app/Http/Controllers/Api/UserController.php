<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpKernel\Exception\HttpException;

class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }
    public function createUser(Request $request)
    {
        try {
            $validateUser = Validator::make(
                $request->all(),
                [
                    'name' => 'required',
                    'email' => 'required|email|unique:users,email',
                    'password' => 'required|min:8'
                ]
            );
            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password)
            ]);
            return response()->json([
                'status' => true,
                'username' => $user->name,
                'message' => 'User Created Successfully',
                'token' => $user->createToken($user->email . '_token', ['server:create'], now()->addWeek())->plainTextToken
            ], 200);
        } catch (HttpException $ex) {
            return response()->json([
                'status' => false,
                'message' => $ex->getMessage()
            ], 500);
        }
    }
    public function loginUser(Request $request)
    {
        try {
            $validateUser = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required'
            ]);
            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }
            if (!Auth::attempt($request->only(['email', 'password']))) {
                return response()->json([
                    'status' => false,
                    'message' => 'Email & Password does not match with our record.'
                ], 401);
            }
            $user = User::where('email', $request->email)->first();
            return response()->json([
                'status' => true,
                'username' => $user->name,
                'message' => 'User Logged In Successfully',
                'token' => $user->createToken('Api Token')->plainTextToken
            ], 200);
        } catch (HttpException $ex) {
            return response()->json([
                'status' => false,
                'message' => $ex->getMessage()
            ], 500);
        }
    }
    /*
        Dòng lệnh này sẽ chỉ xóa token hiện tại của người dùng, tức là token của thiết bị hoặc phiên đang đăng nhập.
        Điều này hữu ích nếu bạn muốn cho phép đăng nhập trên nhiều thiết bị hoặc tab khác nhau, và chỉ muốn đăng xuất khỏi thiết bị hiện tại.
    */
    public function logoutUser(Request $request)
    {
        try {

            //// Session-based authentication


            //// API token-based authentication
            // $user = $request->user();
            // if ($user->currentAccessToken()) {
            //     $user->currentAccessToken()->delete();
            // }
            return response()->json([
                'status' => 200,
                'message' => 'User Logout Successfully'
            ], 200);
        } catch (HttpException $ex) {
            return response()->json([
                'status' => false,
                'message' => $ex->getMessage()
            ], 500);
        }
    }
    /*  Cách này sẽ xóa tất cả các token của người dùng đang đăng nhập, đăng xuất họ khỏi mọi thiết bị hoặc phiên đang sử dụng.
        Dùng cách này nếu bạn muốn thực hiện một lệnh đăng xuất toàn bộ (global logout) khỏi mọi phiên làm việc.
        nếu dùng cách này có thể sử dụng  Cookie Session Để Logout: và bật \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        Thay vì sử dụng token, hãy xác thực qua cookie. Gọi một route logout mà không cần gửi token
    */
    public function logoutUserAllDevice(Request $request)
    {
        try {
            //// Session-based authentication
            auth()->user()->tokens()->delete();
            //// API token-based authentication
            // $user = $request->user();
            // $user->tokens()->delete();
            return response()->json([
                'status' => 200,
                'message' => 'User Logout All Device Successfully'
            ], 200);
        } catch (HttpException $ex) {
            return response()->json([
                'status' => false,
                'message' => $ex->getMessage()
            ], 500);
        }
    }
}
