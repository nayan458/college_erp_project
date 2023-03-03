<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
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
                "user" => $user,
                "student_id" => $user->student_id,
                "token" => $token,
                "label" => "student"
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
                "student_id" => $user->tech_id,
                "token" => $token,
                "label" => "teacher"
            ],200);
        }

        function updatePassword(Request $request){
            $user = Teacher::find($request->id);
            $user->password = Hash::make($request->password);
            $user->save();
            return $user;
        }

        function logout(){
            $result = Auth::logout();
            return response()->json(["result" => $result]);
            // return response()->json(["result" => 1]);
        }
}
