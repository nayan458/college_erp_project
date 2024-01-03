<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Laravel\Sanctum\HasApiTokens;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminAuthController extends Controller
{
    use DispatchesJobs, AuthorizesRequests, ValidatesRequests, HasApiTokens;
    //
    function login(Request $request){
        try{
            $credentials = $request->Validate([
                'email' => 'required',
                'password' => 'required'
            ]);
        } catch(\Throwable $th){
            return response(["ERROR" => $th->getMessage()],401);
        }

        $admin = Auth::guard('admin')->attempt($credentials);
        if(!$admin)
                return response()->json(["error"=>"invalid credentials"],401);

        $user = Auth::guard('admin')->user();
        $token = $user->tokens()->delete();
        $token = $user->createToken('student_token',['admin'])->plainTextToken;
        return response()->json([                
            "user" => $user,
            "student_id" => $user->student_id,
            "token" => $token,
            "label" => "student"
        ],200);

    }
}
