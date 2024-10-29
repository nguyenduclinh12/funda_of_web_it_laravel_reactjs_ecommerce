<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class ApiAdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        //     $token = auth()->user()->currentAccessToken();
        //    return response()->json($token);
        //    return response()->json(auth()->user()->tokenCan('server:admin'));
        if (Auth::check()) {
            if (auth()->user()->tokenCan('server:admin') || auth()->user()->tokenCan('server:user')) {

                return $next($request);
            } else {
                return response()->json([
                    'message' => 'Access Denied. ! as you are not ab Admin',
                    'status'=>403
                ], 403);
            }
        } else {
            return response()->json([
                'message' => 'Please Login First.',
                'status' => 401
            ], 401);
        }
    }
}
