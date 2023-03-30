<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Models\Assignments_sub;
use App\Models\Classe;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Ramsey\Uuid\Rfc4122\UuidV5;

class TeachersController extends Controller
{
    /**
     * TEACHER'S ROLLS, FUNCTIONALITIES
     */

    // add assignments(done)(authorized)

        function add_assignment(Request $request,Classe $classe){

            try {
                $data = $request->validate([
                    "name" => 'required',
                    "desc" => 'required',
                    "assignment" => 'required'
                ]);
            } catch (\Throwable $th) {
                return response()->json(["error"=>"Too low arguments"],403);
            }

            Gate::authorize('teacher_view_class',$classe);

            $classe_id = $classe->classe_id;
            $tech_id = $classe->tech_id;

            $uuid = UuidV5::uuid4();
            $path = 'assignments/'.$tech_id.'/'.$classe_id;
            $rslt = $data['assignment']->storeAS($path,$uuid.'.pdf');
            DB::table('assignments')->insert([
                'ass_name' => $data['name'],
                'ass_desc' => $data['desc'],
                'ass_filelocation' => $path.'/'.$uuid.'.pdf',
                'classe_id' => $classe_id
            ]);
            return(["success"=>$rslt]);
        }
    
    // download added assignment(done)(authorized)
        
        function download_assignment(Assignment $assignment){

            Gate::authorize('teacher_view_assignment',$assignment);

            $query = DB::table('assignments')->select('ass_filelocation')->where('assignment_id',$assignment->assignment_id)->first();
            $path = $query->ass_filelocation;
            return Storage::download($path);
        }

    // view classes(done)(safe)

        function view_class(){

            $tech_id = Auth::user()->tech_id;


            try{
                $classes = Teacher::with('view_classes')->where('tech_id',$tech_id)->first()->view_classes;
            }  catch (\Throwable $th) {
                return response()->json(["error"=>"404 page don't exist"],401);
            }
            return response()->json(["classes" => $classes],200);
        }

    // view students in a class (done)(authorized)

        function view_student_class(Classe $classe){

            Gate::authorize('teacher_view_class',$classe);

            return DB::table('students')
                ->select(['fname','lname','email','gender','location','std_semester'])
                ->join('std_classes','std_classes.student_id','=','students.student_id')
                ->where('std_classes.classe_id','=',$classe->classe_id)
                ->get();

        }

    // view assignments (done)(authorized)
        function view_assignment(Classe $classe){
            Gate::authorize('teacher_view_class',$classe);

            return Classe::with('assignment')->where('classe_id',$classe->classe_id)->first()->assignment;

        }
        
    // view assignments submitions(done)(authorized)
        function view_assignment_submition(Assignment $assignment){

            Gate::authorize('teacher_view_assignment',$assignment);

            $result = Assignments_sub::with('assignments')
            ->where('assignment_id',$assignment->assignment_id)
            ->get();
    
            return response()->json(["submissions"=>$result],200);
        }

    // download student submission for review(authorized)
        function download_student_assignment_submissions(Assignment $assignment,$student_id){

            Gate::authorize('teacher_view_assignment',$assignment);

            $query = DB::table('assignments_subs')->select('ass_sub_filelocation')->where('assignment_id',$assignment->assignment_id)->where('student_id',$student_id)->first();
            $path = $query->ass_sub_filelocation;
            return Storage::download($path);

        }

    // grades or validates submited assignments(authorized)
        function assignment_status(Request $req){

            try{
                $data = $req->validate([
                    "assignment_id" => "required",
                    "student_id" => "required",
                    "status" => "required"
                ]);
            }catch(\Throwable $th){
                return response(["error"=>"invalid input"],401);
            }

            $assignment = Assignment::find($req->assignment_id);

            Gate::authorize('teacher_view_assignment',$assignment);

            try{

                $result = DB::table('assignments_subs')
                    ->where('assignment_id',$data['assignment_id'])
                    ->where('student_id',$data['student_id'])
                    ->update(['status' => $data['status']]);

            }catch(\Throwable $th){
                return response(["error"=>"invalid inpput"],401);
            }
            return $result;
        }

    // Delete assignment(authorized)
        function deleteAssignment(Assignment $assignment){

            Gate::authorize('teacher_view_assignment',$assignment);

            $classe_id = $assignment->classe_id;
            $assignment_id = $assignment->assignment_id;

            $student_submision_path = 'assignment_Submitions/'.$classe_id.'/'.$assignment_id;
            $teacher_path = DB::table('assignments')->where('assignment_id',$assignment->assignment_id);
            
            Storage::deleteDirectory($student_submision_path);
            Storage::delete($teacher_path->first()->ass_filelocation);

            $result = $teacher_path->delete();

            return (["message" => $result]);
        }        

    // return user detail if authorized
        function myData(){

                $user = Auth::user();
                return response()->json([
                    "fname" => $user->tech_fname,
                    "lname" => $user->tech_lname,
                    "gender" => $user->gender,
                    "lable" => "teacher"
                ]);

        }
}
