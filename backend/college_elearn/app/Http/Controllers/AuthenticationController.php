<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticationController extends Controller
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    // student authentication
        function studentLogin(Request $request){
            try{
                $request->validate([
                    "email" => "require",
                    "password" => "required"
                ]);
            }
            catch(\Throwable $th){
                return response(["error" => "invalid credintials"]);
            }

            $token = Auth::attempt([
                "email" => $request->email,
                "password" => $request->password,
            ]);

            if($token){
                return response()->json([
                    'token' => $token,
                ]);
            }

            return response()->json([
                "error" => "invalid credintials"
            ],401);

        }

    //  teachers authentication
        function teacherLogin(Request $request){
            try {
                $request->validate([
                    "email"=>"requires",
                    "password"=>"requires"
                ]);
            } catch (\Throwable $th) {
                return response(["error" => "invalid credintials"]);
            }
            
            $token = Auth::attempt([
                "email"=>$request->email,
                "password"=>$request->password,
            ]);

            if($token){
                return response()->json([
                    'token' => $token
                ],200);
            }
            return response()->json([
                "error" => "invalid credintials"
            ],401);
        }
}
