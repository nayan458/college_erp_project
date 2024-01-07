<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Laravel\Sanctum\HasApiTokens;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AdminAuthController extends Controller
{
    use DispatchesJobs, AuthorizesRequests, ValidatesRequests, HasApiTokens;
    
    // register Admin
        function register(Request $request){
            try{
                $data = $request->validate([
                    'name' => 'required',
                    'email' => 'required',
                    'password' => 'required'
                ]);
            } catch(\throwable $error){
                return response(["Error" => $error],$error->status);
            }

            $admin = Admin::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password'])
            ]);

            $token = $admin->createToken('admin_token',['Admin'])->plainTextToken;

            return (["message" => $token]);
        }

    //login
        // function login(Request $request){
        //     try{
        //         $credentials = $request->validate([
        //             'email' => 'required',
        //             'password' => 'required'
        //         ]);
        //     } catch(\Throwable $th){
        //         return response(["ERROR" => $th->getMessage()],401);
        //     }

            
        //     $admin = Auth::guard('admin')->attempt($credentials);

        //     if(!$admin)
        //             return response()->json(["error"=>"invalid credentials"],401);

        //     $user = Auth::guard('admin')->user();
        //     $token = $user->tokens()->delete();
        //     $token = $user->createToken('admin_token',['Admin'])->plainTextToken;
        //     return response()->json([                
        //         "user" => $user,
        //         "student_id" => $user->student_id,
        //         "token" => $token,
        //         "label" => "student"
        //     ],200);
        // }

        function login(Request $request){
            $credentials = $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);
        
            if (Auth::guard('admin')->attempt($credentials)) {
                $user = Auth::guard('admin')->user();
                $token = $user->createToken('admin_token', ['Admin'])->plainTextToken;
        
                return response()->json([
                    'user' => $user->name,
                    'token' => $token,
                    'label' => 'admin',
                    'role' => 'admin',
                ]);
            }

            return response()->json(['error' => 'Invalid credentials'], 401);
        }
    
}
