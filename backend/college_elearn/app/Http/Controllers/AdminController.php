<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Student;
use App\Models\Teacher;
use Error;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PhpParser\Node\Stmt\TryCatch;

class AdminController extends Controller
{
    /**
     * ADMIN ROLLS
     */

    // Create departments

        function register_department(Request $req){
            try {
                $req->validate(['dep_name' => 'required|unique:departments']);
            } catch (\Throwable $th) {
                return(["error"=>"Department already Exists"]);
            }
            $dep = new Department();
            $dep->dep_name = $req->dep_name;
            $dep->save();
            return(["message"=>"Department registered successfully"]);
        }
    // Delete departments

        function delete_department(Request $req){
            try {
                $dep = DB::table('departments')->where('dep_name','=',$req->dep_name)->delete();
                if(!$dep){
                    throw $dep;
                }
            } catch (\Throwable $th) {
                return(["error"=>"Department does not exist"]);
            }

            return(["message"=>"department deleted successfully"]);
        }

    // view departments

        function view_departments(){
            return Department::all();
        }

    // Register teachers

        function register_teachers(Request $req){
            try {
                $req->validate([
                    'tech_fname'=>'required|max:20',
    
                    'tech_lname'=>'required',
    
                    'email'=>'required|email',
    
                    'username'=>'required',
    
                    'password'=>'required',
    
                    'location'=>'required',

                    'department'=>'required'
                ]);
            } catch (\Throwable $th) {
                return (["Throughen error"=>$th]);
            }
            
                $dep_id = DB::table('departments')->select('dep_id')->where('dep_name',"=",$req->department)->first();
            if(!$dep_id)
                return(["error"=>"departmant doesnot exists"]);
            

            DB::table('teachers')->insert([
                'tech_fname' => $req->tech_fname,
                'tech_lname' => $req->tech_lname,
                'email' => $req->email,
                'username' => $req->username,
                'password' => $req->password,
                'location' => $req->location,
                'dep_id' => $dep_id->dep_id,
            ]);
            return(["message"=>"Registered Successfully"]);
        }

    // Register students

        function register_students(Request $req){
            try {
                $req->validate([
                    'fname' => 'required',
                    'lname' => 'required',
                    'email' => 'required|email',
                    'username' => 'required|unique:students',
                    'password' => 'required',
                    'location' => 'required',
                    'std_semester' => 'required',
                    'department'=>'required'
                ]);
            } catch (\Throwable $th) {
                return(["error"=>"Student already exist"]);
            }
                $dep_id = DB::table('departments')->select('dep_id')->where('dep_name','=',$req->department)->first();
            if(!$dep_id)
                return(["error"=>"department does not exists"]);
            DB::table('students')->insert([
                'fname' => $req->fname,
                'lname' => $req->lname,
                'email' => $req->email,
                'username' => $req->username,
                'password' => $req->password,
                'location' => $req->location,
                'std_semester' => $req->std_semester,
                'dep_id' => $dep_id->dep_id,
            ]);
            return(["message"=>"Registered Successfully"]);
        }

    // view teachers

        function all_teachers(){
            return Teacher::all();
        }
        
    // view students
        
        function all_students(){
            return Student::all();
        }
    
    // Delete Teachers

        function delete_teachers(Request $req){
                try {
                    $deleted = DB::table('teachers')->where('username',$req->username)->delete();
                    if(!$deleted)
                        throw($deleted);
                } catch (\Throwable $th) {
                    return(["error"=>"Teacher not found"]);
                }
                return(["message"=>"teacher deleted succesfully"]);
        }

    // Delete Students

        function delete_students(Request $req){
            try {
                $deleted = DB::table('students')->where('username',$req->username)->delete();
                if(!$deleted)
                    throw($deleted);
            } catch (\Throwable $th) {
                //throw $th;
                return(["error"=>"student not found","main"=>$th]);
            }
            return(["message"=>"student deleted successfully"]);
        }

    // Rgister or add subjects
    // 
}
