<?php

namespace App\Http\Controllers;

use App\Models\Classe;
use App\Models\Department;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Auth\Events\Validated;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;
use Ramsey\Uuid\Rfc4122\UuidV5;

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
                    
                    'gender'=>'required',
    
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
                'gender' => $data['gender'],
                'username' => $data['username'],
                'password' => Hash::make($data['password']),
                'location' => $data['location'],
                'dep_id' => $dep_id->dep_id,
            ]);

            $token = $teacher->createToken('teacher_token',['Teacher'])->plainTextToken;

            return(["message"=>"Registered Successfully","token"=>$token]);
        }

    // Register students
        function register_students(Request $req){
            try {
                $data = $req->validate([
                    'fname' => 'required',
                    'lname' => 'required',
                    'email' => 'required|email',
                    'gender' => 'required',
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
                'gender' => $data['gender'],
                'username' => $data['username'],
                'password' => Hash::make($data['password']),
                'location' => $data['location'],
                'std_semester' => $data['std_semester'],
                'dep_id' => $dep_id->dep_id,
            ]);
            
            $token = $student->createToken('student_token',['Student'])->plainTextToken;

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
            try {
                DB::table('std_classes')->insert([
                    'classe_id' => $request->classe_id,
                    'student_id' => $request->student_id
                ]);

            } catch (\Throwable $th) {

                return(["Error" => "Student or Class does not exist"]);

            }
            return (["message" => "Student assigned to class successfully"]);

        }

    // Add Teachers By excel sheet
        function add_teachers_excel(Request $req){

            try{
                $data = $req->validate([
                    'file' => 'required',
                ]);
            } catch(\throwable $th){
                return response(["ERROR" => "No file"],403);
            }

            // $uuid = UuidV5::uuid4();
            // $data['file']->storeAS('/excelDataTemplate','TeacherTeamplate.xlsx');

            $fileData = $req->file('file');

            $datafile = Excel::toCollection([],$fileData)->first();

            
            $isFirstRow = true;

            foreach ($datafile as $row) {
                
                if($isFirstRow){
                    $isFirstRow = false;
                    continue;
                }
                try{
                    
                    $dep_id = DB::table('departments')->select('dep_id')->where('dep_name',"=",$row[6])->first();

                    Teacher::create([
                        'tech_fname' => $row[0],
                        'tech_lname' => $row[1],
                        'email' => $row[2],
                        'gender' => $row[3],
                        'username' => $row[4],
                        'location' => $row[5],
                        'dep_id' => $dep_id->dep_id,
                        'password' => Hash::make($row[0].'123'),
                    ]);
                } catch(\throwable $th){
                    continue;
                }
            }

            return(["message" => "succesfully added every teachers"]);
        }
    // Add Students By excel sheet
        function add_students_excel(Request $req){

            try{
                $data = $req->validate([
                    'file' => 'required',
                ]);
            } catch(\throwable $th){
                return response(["ERROR" => "No file"],403);
            }

            // $uuid = UuidV5::uuid4();
            // $data['file']->storeAS('/excelDataTemplate','StudentTemplate.xlsx');

            $fileData = $req->file('file');

            $datafile = Excel::toCollection([],$fileData)->first();

            
            $isFirstRow = true;

            foreach ($datafile as $row) {
                
                if($isFirstRow){
                    $isFirstRow = false;
                    continue;
                }
                try{
                    
                    $dep_id = DB::table('departments')->select('dep_id')->where('dep_name',"=",$row[7])->first();

                    Student::create([
                        'fname' => $row[0],
                        'lname' => $row[1],
                        'email' => $row[2],
                        'gender' => $row[3],
                        'username' => $row[4],
                        'location' => $row[5],
                        'std_semester' => $row[6],
                        'dep_id' => $dep_id->dep_id,
                        'password' => Hash::make($row[0].'123'),
                    ]);
                } catch(\throwable $th){
                    // return response(["Error" => $th]);
                    // continue;
                }
            }

            return(["message" => "succesfully added every students"]);
        }
    // Add Departments By excel sheet
    function add_departments_excel(Request $req){

        try {
            $data = $req->validate([
                'file' => 'required',
            ]);
        } catch(\Throwable $th) {
            return response(["ERROR" => "No file"], 403);
        }
    
        $fileData = $req->file('file');
        $datafile = Excel::toCollection([], $fileData)->first();
        
        $isFirstRow = true;
        $errorRows = [];
        
        foreach ($datafile as $index => $row) {
            if ($isFirstRow) {
                $isFirstRow = false;
                continue;
            }
            try {
                Department::create([
                    'dep_name' => $row[0],
                ]);
            } catch (\Throwable $th) {
                $errorRows[] = [
                    'row_index' => $index + 1, // Index starts from 0, rows start from 1
                    'error' => $th->getMessage(),
                    'data' => $row,
                ];
            }
        }
    
        if (!empty($errorRows)) {
            $errorFileName = 'ErrorReport_' . time() . '.xlsx';
            Excel::store(function($excel) use ($errorRows) {
                $excel->setTitle('Error Report');
                $excel->sheet('Errors', function($sheet) use ($errorRows) {
                    $sheet->appendRow(['Row Index', 'Error Message', 'Data']);
                    foreach ($errorRows as $errorRow) {
                        $sheet->appendRow([
                            $errorRow['row_index'],
                            $errorRow['error'],
                            implode(', ', $errorRow['data']),
                        ]);
                    }
                });
            }, $errorFileName, 'excelReports');
            // return Storage::download('excelReports/'.$errorFileName);
            return response(['error_report' => $errorFileName], 200);
        }
        

        return ["message" => "successfully added Departments"];
    }
    
    //Download Template
        function downloadDepartmentExcelTemplate(){
            return Storage::download('/excelDataTemplate/DepartmentTemplate.xlsx');
        }
    //Download Template
        function downloadTeacherExcelTemplate(){
            return Storage::download('/excelDataTemplate/TeacherTemplate.xlsx');
        }
    //Download Template
        function downloadStudentExcelTemplate(){
            return Storage::download('/excelDataTemplate/StudentTemplate.xlsx');
        }
    //Download Template
        function downloadErrorExcel(){
            return Storage::download('excelReports/ErrorReport_1704121660.xlsx');
        }
}
