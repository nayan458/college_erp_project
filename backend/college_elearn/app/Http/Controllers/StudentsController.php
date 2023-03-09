<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Ramsey\Uuid\Rfc4122\UuidV5;

class StudentsController extends Controller
{
    /**
     * STUDENT ROLLS
     */

    // Student view classes(done)
        function view_classes($student_id){
            try{
                    $classes =  Student::with('classes')
                            ->where('student_id',$student_id)
                            ->get()
                            ->pluck('classes')
                            ->first();
                }  catch (\Throwable $th) {
                    return response()-> json(["error"=>"404 page don't exist"],401);
                }
                return response()->json(["classes"=>$classes],200);
        }

    // Studnet view assignments(done)
        function view_assignment($student_id,$class_id){

            $result = DB::table('assignments_subs')
                ->where('student_id',$student_id)
                ->join('assignments','assignments_subs.assignment_id','assignments.assignment_id')
                ->where('classe_id',$class_id)
                ->get();

            $query = DB::table('assignments')
                ->where('classe_id',$class_id)
                ->whereNotExists(function($qury)use($student_id){
                    $qury->select(DB::raw(1))
                    ->from('assignments_subs')
                    ->where('student_id','=',$student_id)
                    ->whereRaw('assignments.assignment_id = assignments_subs.assignment_id');
                })
                ->get();

            return response()->json([
                "pending" => $query,
                "submited" => $result
            ],200);

        }

    // student downloads assignment
        function download_assignment($student_id,$class_id,$ass_id){
            
            $query = DB::table('assignments')->select('ass_filelocation')->where('assignment_id',$ass_id)->first();
            $path = $query->ass_filelocation;
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
            $uuid = UuidV5::uuid4();
            $path = 'assignment_Submitions/'.$student_id.'/'.$cls_id;
            $req->assignment->storeAS($path,$uuid.'.pdf');
            DB::table('assignments_subs')->insert([
                'assignment_id'=>$req->ass_id,
                'ass_sub_filelocation' => $path.'/'.$uuid.'.pdf',
                'student_id'=>$student_id,
                'status'=>'submitted',
            ]);
            return response()->json(["path" => $req->file('assignment')->isValid()],200);
        }

    // student view classmats
        function view_classmates($student_id,$class_id){

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
