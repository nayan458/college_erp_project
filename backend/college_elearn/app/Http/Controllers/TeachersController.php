<?php

namespace App\Http\Controllers;

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
    
    // teacher creates class

        function create_class(Request $req,$username){
            try {
                $req->validate([
                    'class_name' => 'required',
                    'class_desc' => 'required',
                    'class_semester' => 'required'
                ]);
            } catch (\Throwable $th) {
                return(["error"=>"class couldnot be registered"]);
            }
            try {
                $tech_id = DB::table('teachers')->select('tech_id')->where('username','=',$username)->first();
                DB::table('classes')->insert([
                    'class_name' => $req->class_name,
                    'class_desc' => $req->class_desc,
                    'class_semester' => $req->class_semester,
                    'tech_id' => $tech_id->tech_id
                ]);   
            } catch (\Throwable $th) {
                return(["error"=>"teacher doesnot exist"]);
            }
            return(["message"=>"Registered successfully"]);
        }

    // teacher add students

        function add_students(Request $req,$username,$class_id){
            
            try{
                $tech_id = DB::table('teachers')->select('tech_id')->where('username','=',$username)->first()->tech_id;
                $clas_id = DB::table('classes')->select('classe_id')->where('tech_id','=',$tech_id)->where('classe_id','=',$class_id)->first()->classe_id;
                if(!$clas_id)
                    throw $clas_id;
            } catch(\Throwable $th){
                return(["error"=>"class doesnot exists"]);
            }

            
            $student_array = $req->student_ids;
            foreach($student_array as $student){
                DB::table('std_classes')->insert([
                    'classe_id' => $clas_id,
                    'student_id' => $student 
                ]);
            }
            return(["student list"=>"successfully added students"]);
        }

    // teacher add assignments
        function add_assignment(Request $req,$username,$class_id){
            try{
                $tech_id = DB::table('teachers')->select('tech_id')->where('username','=',$username)->first()->tech_id;
                $clas_id = DB::table('classes')->select('classe_id')->where('tech_id','=',$tech_id)->where('classe_id','=',$class_id)->first()->classe_id;
                if(!$clas_id)
                    throw $clas_id;
            } catch(\Throwable $th){
                return(["error"=>"class doesnot exists"]);
            }
            $path = 'assignments/'.$username.'/'.$clas_id;
            $rslt = $req->assignment->storeAS($path,$req->ass_name.'.pdf');
            DB::table('assignments')->insert([
                'ass_name' => $req->ass_name,
                'ass_desc' => $path.'/'.$req->ass_name.'.pdf',
                'classe_id' => $clas_id
            ]);
                // $rslt = $path.'/'.$req->ass_name.'.pdf';
            // return(["success"=>]);
            return(["success"=>$rslt]);
        }
    // teacher add quiz
        function add_quiz(){}
    // teacher view classes

        function view_class($username){
            $tech_id = DB::table('teachers')->select('tech_id')->where('username','=',$username)->first();
            return DB::table('classes')
            ->where('tech_id','=',$tech_id->tech_id)
            ->get();
        }
    // view students in a class

        function view_student_class($username,$class_id){
            try{
                $tech_id = DB::table('teachers')->select('tech_id')->where('username','=',$username)->first()->tech_id;
                $clas_id = DB::table('classes')->select('classe_id')->where('tech_id','=',$tech_id)->where('classe_id','=',$class_id)->first()->classe_id;
                if(!$clas_id)
                    throw $clas_id;
            } catch(\Throwable $th){
                return(["error"=>"class doesnot exists"]);
            }

            return DB::table('students')
                ->select(['fname','lname','email','location','std_semester'])
                ->join('std_classes','std_classes.student_id','=','students.student_id')
                ->where('std_classes.classe_id','=',$clas_id)
                ->get();
        }
    // teacher view assignments submitions
        function view_assignment_submition(){}
    // teacher view quiz submitions    

    // teacher grades or validates submited assignments
    
    // teacher grades or validates submited quiz


    // test any api
        function getall(Request $req){
            return DB::table($req->table)->get();
        }
    
}
