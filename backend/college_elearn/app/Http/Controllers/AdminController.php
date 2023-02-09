<?php

namespace App\Http\Controllers;

use App\Models\Classe;
use App\Models\Department;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    use DispatchesJobs, AuthorizesRequests, ValidatesRequests;
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
                $data = $req->validate([
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

            $teacher = Teacher::create([
                'tech_fname' => $data['tech_fname'],
                'tech_lname' => $data['tech_lname'],
                'email' => $data['email'],
                'username' => $data['username'],
                'password' => Hash::make($data['password']),
                'location' => $data['location'],
                'dep_id' => $dep_id->dep_id,
            ]);

            $token = $teacher->createToken('teacher_token')->plainTextToken;

            return(["message"=>"Registered Successfully","token"=>$token]);
        }

    // Register students
        function register_students(Request $req){
            try {
                $data = $req->validate([
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
            
            $student = Student::create([
                'fname' => $data['fname'],
                'lname' => $data['lname'],
                'email' => $data['email'],
                'username' => $data['username'],
                'password' => Hash::make($data['password']),
                'location' => $data['location'],
                'std_semester' => $data['std_semester'],
                'dep_id' => $dep_id->dep_id,
            ]);
            
            $token = $student->createToken('student_token')->plainTextToken;

            return(["message"=>"Registered Successfully","token"=>$token]);
        }

    // view teachers

        function all_teachers(){
            return Teacher::all();
        }
        
    // view students
        
        function all_students(){
            return Student::all();
        }
    
    // view classes
        function all_classes(){
            return Classe::all();
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

    // Register Classes and asign teachers to it.
        function register_classes(Request $req){
            try {
                $req->validate([
                    'class_name' => 'required',
                    'class_desc' => 'required',
                    'class_semester' => 'required',
                ]);
            } catch (\Throwable $th) {
                return(["error"=>"class couldnot be registered"]);
            }
            try {
                DB::table('classes')->insert([
                    'class_name' => $req->class_name,
                    'class_desc' => $req->class_desc,
                    'class_semester' => $req->class_semester,
                    'tech_id' => $req->tech_id
                ]);   
            } catch (\Throwable $th) {
                return(["error"=>"teacher doesnot exist"]);
            }
            return(["message"=>"Registered successfully"]);
        }
    // Add students to a class
    function add_students_to_class(Request $request){
        return DB::table('std_classes')->insert([
            'classe_id' => $request->classe_id,
            'student_id' => $request->student_id
        ]);

    }
}
