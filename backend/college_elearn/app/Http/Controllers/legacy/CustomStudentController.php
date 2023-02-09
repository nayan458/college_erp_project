<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Models\Classe;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class StudentsController extends Controller
{
    /**
     * STUDENT ROLLS
     */
    // Student view classes
        function view_classes($username){
            $student_id = DB::table('students')->select('student_id')->where('username','=',$username)->first()->student_id;
            return DB::table('std_classes')->get()->where('student_id','=',$student_id);
            // return $student_id;
        }

    // Studnet view assignments
        function view_assignment($username,$class_id){
            try{
                $student_id = DB::table('students')->select('student_id')->where('username',$username)->first()->student_id;
                $clas_id = DB::table('std_classes')->where('student_id',$student_id)->where('classe_id',$class_id)->first()->classe_id;
            } catch(\Throwable $th){
                return(["error"=>"404 Page not found"]);
            }
            return Classe::with('assignment')->where('classe_id',$clas_id)->first()->assignment;
        }
    // student downloads assignment
        function download_assignment($username,$class_id,$ass_id){
            try{
                $student_id = DB::table('students')->select('student_id')->where('username',$username)->first()->student_id;
                $clas_id = DB::table('std_classes')->where('student_id',$student_id)->where('classe_id',$class_id)->first()->classe_id;
            } catch(\Throwable $th){
                return(["error"=>"404 Page not found"]);
            }
            $query = DB::table('assignments')->select('ass_desc')->where('assignment_id',$ass_id)->first();
            $path = $query->ass_desc;
            return Storage::download($path);
        }

    // Studnet submit assignments
        function submit_assignment(Request $req,$username,$class_id){
            try {
                $student_id = DB::table('students')->select('student_id')->where('username','=',$username)->first()->student_id;
                $cls_id = DB::table('std_classes')->select('classe_id')->where('student_id','=',$student_id)->where('classe_id',$class_id)->first()->classe_id;
                if(!$cls_id)
                    throw $cls_id;
            } catch (\Throwable $th) {
                return(["error"=>"404 page don't exist"]);
            }
            $path = 'assignment_Submitions/'.$username.'/'.$cls_id;

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
        function view_classmates($username,$class_id){
            // class.std_classes.students
            try {
                $student_id = DB::table('students')->select('student_id')->where('username','=',$username)->first()->student_id;
                $cls_id = DB::table('std_classes')->select('classe_id')->where('student_id','=',$student_id)->where('classe_id',$class_id)->first()->classe_id;
                if(!$cls_id)
                    throw $cls_id;
            } catch (\Throwable $th) {

                return(["error"=>"404 page don't exist"]);
                
            }
            // check if user belongs to requested class;
            echo DB::table('students')
            ->join('std_classes','std_classes.student_id','students.student_id')
            ->where('classe_id','=',$cls_id)
            ->get();
            
        }
        
}
