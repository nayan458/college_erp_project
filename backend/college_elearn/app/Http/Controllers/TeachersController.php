<?php

namespace App\Http\Controllers;

use App\Models\Classe;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

    // teacher add students
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
            $rslt = $request->assignment->storeAS($path,$request->ass_name.'.pdf');
            DB::table('assignments')->insert([
                'ass_name' => $request->ass_name,
                'ass_desc' => $path.'/'.$request->ass_name.'.pdf',
                'classe_id' => $clas_id
            ]);
                // $rslt = $path.'/'.$req->ass_name.'.pdf';
            // return(["success"=>]);
            return(["success"=>$rslt]);
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

        function view_student_class($class_id){

            return DB::table('students')
                ->select(['fname','lname','email','location','std_semester'])
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
    // teacher view assignments submitions(pending)
        function view_assignment_submition($ass_id,){
            echo Classe::with('assignment_submition')->get();
        }
    // teacher view quiz submitions    
    // teacher grades or validates submited assignments
    // teacher grades or validates submited quiz
    // test any api
        function getall(Request $req){
            return DB::table($req->table)->get();
        }
}
