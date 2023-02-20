<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Models\Classe;
use App\Models\Std_class;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class StudentsController extends Controller
{
    /**
     * STUDENT ROLLS
     */
    // Student view classes(done)
    function view_classes($student_id){

                return Student::with('classes')
                        ->where('student_id',$student_id)
                        ->get()
                        ->pluck('classes')
                        ->first();
            }

    // Studnet view assignments(need Update)
        function view_assignment($student_id,$class_id){
            try{
                $clas_id = DB::table('std_classes')->where('student_id',$student_id)->where('classe_id',$class_id)->first()->classe_id;
            } catch(\Throwable $th){
                return(["error"=>"404 Page not found"]);
            }
            return Classe::with('assignment')->where('classe_id',$clas_id)->first()->assignment;
        }
    // student downloads assignment
        function download_assignment($student_id,$class_id,$ass_id){
            try{
                $clas_id = DB::table('std_classes')->where('student_id',$student_id)->where('classe_id',$class_id)->first()->classe_id;
            } catch(\Throwable $th){
                return(["error"=>"404 Page not found"]);
            }
            $query = DB::table('assignments')->select('ass_desc')->where('assignment_id',$ass_id)->first();
            $path = $query->ass_desc;
            return Storage::download($path);
        }

    // Studnet submit assignments
        function submit_assignment(Request $req,$student_id,$class_id){
            try {
                $cls_id = DB::table('std_classes')->select('classe_id')->where('student_id','=',$student_id)->where('classe_id',$class_id)->first()->classe_id;
                if(!$cls_id)
                    throw $cls_id;
            } catch (\Throwable $th) {
                return(["error"=>"404 page don't exist"]);
            }
            $path = 'assignment_Submitions/'.$student_id.'/'.$cls_id;

            $req->assignment->storeAS($path,$req->name.'.pdf');
            DB::table('assignments_subs')->insert([
                'assignment_id'=>$req->ass_id,
                'student_id'=>$student_id,
                'status'=>'submitted',
            ]);
            return (["success"]);
        }
    // Studnet view quiz

    // Student submit quiz

    // student view classmats
        function view_classmates($student_id,$class_id){
            // class.std_classes.students
            try {
                $cls_id = DB::table('std_classes')->select('classe_id')->where('student_id','=',$student_id)->where('classe_id',$class_id)->first()->classe_id;
                if(!$cls_id)
                    throw $cls_id;
            } catch (\Throwable $th) {

                return(["error"=>"404 page don't exist"]);
                
            }
            // check if user belongs to requested class;
            return DB::table('students')
            ->select('fname','lname','gender')
            ->join('std_classes','std_classes.student_id','students.student_id')
            ->where('classe_id','=',$cls_id)
            ->get();
            
        }

        function myData(){
            $user = Auth::user();
            return response()->json([
                "fname" => $user->fname,
                "lname" => $user->lname,
                "student_id" => $user->student_id,
                "lable" => "student"
            ]);
        }
        
}
