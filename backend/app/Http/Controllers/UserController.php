<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $user = User::where('email', $request['email'])->first();

        if($user) {

            $response['status'] = 0;
            $response['code'] = 409;   
            $response['message'] = 'User with this email already exists';

            return response()->json($response);
        } else {

            // $fields = $request->validate([
            //     'name' => 'required|string',
            //     'email' => 'required|string|unique:users,email',
            //     'password' => 'required|string',
            // ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password)
            ]);

            $credentials = $request->only('email', 'password');
            JWTAuth::attempt($credentials);

            $user = auth()->user();
            $data['token'] = auth()->claims([
                'name' => $user->name,
            ])->attempt($credentials);

            $response['status'] = 1;
            $response['code'] = 200;
            $response['message'] = 'User successfully registered';
            $response['data'] = $data;
    
            return response()->json($response);
        }

        
    }

    public function login(Request $request) {
        $credentials = $request->only('email', 'password');
        try{
            if(!JWTAuth::attempt($credentials)){
                $response['status'] = 0;
                $response['code'] = 401;
                $response['message'] = "Wrong email or password";
                $response['data'] = null;
                // return response()->json($response);
                return response(["message" => "Wrong email or password"], 401);
            }
        } catch(JWTException $e) {
            $response['status'] = 0;
            $response['code'] = 500;
            $response['message'] = "Could not create token";
            $response['data'] = null;
            return response()->json($response);
        }

        $user = auth()->user();
        $data['token'] = auth()->claims([
            'name' => $user->name,
        ])->attempt($credentials);

        $response['status'] = 1;
        $response['code'] = 200;
        $response['message'] = "Logged in successfully";
        $response['data'] = $data;
        return response()->json($response);
    }
   
}
