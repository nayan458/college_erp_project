<?php

namespace App\Http\Controllers;

use App\Models\Assignments_sub;
use App\Models\Classe;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\PersonalAccessToken;

class TeachersController extends Controller
{

    function checkTeacher($username,$class_id){
        try{
            $tech_id = DB::table('teachers')->select('tech_id')->where('username','=',$username)->first()->tech_id;
            $clas_id = DB::table('classes')->select('classe_id')->where('tech_id','=',$tech_id)->where('classe_id','=',$class_id)->first()->classe_id;
            if(!$clas_id)
                throw $clas_id;
        } catch(\Throwable $th){
            return false;
        }
        return $clas_id;
    }
    /**
     * TEACHER'S ROLLS, FUNCTIONALITIES
     */

    // teacher add assignments(done)

        function add_assignment(Request $request,$tech_id,$class_id){
            try{
                $clas_id = DB::table('classes')->select('classe_id')->where('tech_id','=',$tech_id)->where('classe_id','=',$class_id)->first()->classe_id;
                if(!$clas_id)
                    throw $clas_id;
            } catch(\Throwable $th){
                return(["error"=>"class doesnot exists"]);
            }
            $path = 'assignments/'.$tech_id.'/'.$clas_id;
            $rslt = $request->assignment->storeAS($path,$request->name.'.pdf');
            DB::table('assignments')->insert([
                'ass_name' => $request->name,
                'ass_desc' => $request->desc,
                'ass_filelocation' => $path.'/'.$request->name.'.pdf',
                'classe_id' => $clas_id
            ]);
                // $rslt = $path.'/'.$req->ass_name.'.pdf';
            // return(["success"=>]);
            return(["success"=>$rslt]);
            // return(["ass_name"=>$request->name,"ass_desc" => $request->desc]);
        }
    
    // teacher download added assignment(done)
        
        function download_assignment($tech_id,$class_id,$ass_id){

            $query = DB::table('assignments')->select('ass_filelocation')->where('assignment_id',$ass_id)->first();
            $path = $query->ass_filelocation;
            return Storage::download($path);
        }

    // teacher view classes(done)

        function view_class($tech_id){
            
            // echo DB::table('classes')
            // ->where('tech_id','=',$tech_id)
            // ->get();

            return Teacher::with('view_classes')->where('tech_id',$tech_id)->first()->view_classes;
            // echo Teacher::with('view_classes')->find(")->get();
        }
    // view students in a class (done)

        function view_student_class($tech_id,$class_id){

            return DB::table('students')
                ->select(['fname','lname','email','gender','location','std_semester'])
                ->join('std_classes','std_classes.student_id','=','students.student_id')
                ->where('std_classes.classe_id','=',$class_id)
                ->get(); 

            // return Classe::with('students')->get();

        }

    // teacher view assignments (done)
        function view_assignment($tech_id,$class_id){
            try{
                $clas_id = DB::table('classes')->where('tech_id',$tech_id)->where('classe_id',$class_id)->first()->classe_id;
            } catch(\Throwable $th){
                return(["error"=>"404 Page not found"]);
            }
            return Classe::with('assignment')->where('classe_id',$clas_id)->first()->assignment;
        }
    // teacher view assignments submitions(done)
        function view_assignment_submition($ass_id,){

            $result = Assignments_sub::with('assignments')
            ->where('assignment_id',$ass_id)
            ->get();
    
            return response()->json(["submissions"=>$result],200);
        }

    // download student submission for review    
        function download_student_assignment_submissions($student_id,$ass_id){
            
            $query = DB::table('assignments_subs')->select('ass_sub_filelocation')->where('assignment_id',$ass_id)->where('student_id',$student_id)->first();
            $path = $query->ass_sub_filelocation;
            return Storage::download($path);

        }

    // teacher grades or validates submited assignments
        function assignment_status(Request $requset){
            try{
                $result = DB::table('assignments_subs')->where('assignment_id',$requset->assignment_id)->where('student_id',$requset->student_id)->update(['status' => $requset->status]);
            }catch(\Throwable $th){
                return response(["error"=>"invalid"]);
            }
            return $result;
        }

    // Delete assignment
        function deleteAssignment($assignment_id){
            $result = DB::table('assignments')->where('assignment_id',$assignment_id)->delete();
            return response()->json(["message" => "ok"]);
        }        

    // return user detail if authenticated
        function myData(){

                $user = Auth::user();
                return response()->json([
                    "fname" => $user->tech_fname,
                    "lname" => $user->tech_lname,
                    "student_id" => $user->tech_id,
                    "lable" => "teacher"
                ]);

        }
}
