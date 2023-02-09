<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;

class AuthenticationController extends Controller
{
    use DispatchesJobs, AuthorizesRequests, ValidatesRequests, HasApiTokens;
    //
    // student authentication
        function studentLogin(Request $request){
            try{
                $credentials = $request->validate([
                    "email" => "required",
                    "password" => "required"
                ]);
            }
            catch(\Throwable $th){
                return response(["error" => "invalid credintials"],401);
            }
            $student = Auth::guard('student')->attempt($credentials);
            if(!$student)
                return response()->json(["error"=>"invalid credentials"],401);
            $user = Auth::guard('student')->user();
            $token = $user->tokens()->delete();
            $token = $user->createToken('student_token')->plainTextToken;
            return response()->json([                
                "user" => $student,
                "token" => $token
            ],200);
        }

    //  teachers authentication
        function teacherLogin(Request $request){
            try {
                $credentials = $request->validate([
                    "email" => "required",
                    "password" => "required"
                ]);
            } catch (\Throwable $th) {
                return response(["error" => "invalid credintials"]);
            }

            $teacher = Auth::guard('teacher')->attempt($credentials);
            if(!$teacher)
                return response()->json(["error"=>"invalid credentials"],401);
            $user = Auth::guard('teacher')->user();
            $token = $user->tokens()->delete();
            $token = $user->createToken('teacher_token')->plainTextToken;

            return response()->json([
                "user" => $user,
                "token" => $token
            ],200);
        }
}
