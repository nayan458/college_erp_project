<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Models\Classe;
use App\Models\Std_class;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Ramsey\Uuid\Rfc4122\UuidV5;

class StudentsController extends Controller
{
    /**
     * STUDENT ROLLS
     */

    // Student view classes(done)(safe)
        function view_classes(){
            $student_id = Auth::user()->student_id;
            try{
                    $classes = Student::with('classes')
                            ->where('student_id',$student_id)
                            ->get()
                            ->pluck('classes')
                            ->first();
                }  catch (\Throwable $th) {
                    return response()-> json(["error"=>"404 page don't exist"],401);
                }
                return response()->json(["classes"=>$classes],200);
        }

    // Studnet view assignments(done)(authorized)
        function view_assignment(Classe $classe){            

            Gate::authorize('student_view_classmates',$classe);

            $student_id = Auth::user()->student_id;
            $class_id = $classe->classe_id;
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

    // student downloads assignment(authorized)
        function download_assignment(Assignment $assignment){
            
            Gate::authorize('student_view_assignments',$assignment);

            $query = DB::table('assignments')->select('ass_filelocation')->where('assignment_id',$assignment->assignment_id)->first();
            $path = $query->ass_filelocation;
            return Storage::download($path);
        }

    // Studnet submit assignments(validated)(authorized)
        function submit_assignment(Request $req){
            
            try{
                $data = $req->validate([
                    "assignment"  => "required",
                    "ass_id" => "required"
                ]);
            }catch(\Throwable $th){
                return response(["message"=>"Invalid input"],403);
            }

            $assignment = Assignment::find($req->ass_id);

            Gate::authorize('student_view_assignments',$assignment);

            $classe_id = $assignment->classe_id;
            $student_id = Auth::user()->student_id;
            $assignment_id = $assignment->assignment_id;


            $uuid = UuidV5::uuid4();
            // $path = 'assignment_Submitions/'.$student_id.'/'.$classe_id;
            $path = 'assignment_Submitions/'.$classe_id.'/'.$assignment_id;
            $data['assignment']->storeAS($path,$uuid.'.pdf');
            
            DB::table('assignments_subs')->insert([
                'assignment_id'=>$data['ass_id'],
                'ass_sub_filelocation' => $path.'/'.$uuid.'.pdf',
                'student_id'=>$student_id,
                'status'=>'submitted',
            ]);
            return response()->json(["path" => $req->file('assignment')->isValid()],200);
        }

    // student view classmats(done)(authorized)
        function view_classmates(Classe $classe){

            Gate::authorize('student_view_classmates',$classe);

            return DB::table('students')
            ->select('fname','lname','gender')
            ->where('classe_id','=',$classe->classe_id)
            ->join('std_classes','std_classes.student_id','students.student_id')
            ->get();
            
        }
    // mydata
        function myData(){
            $user = Auth::user();
            return response()->json([
                "fname" => $user->fname,
                "lname" => $user->lname,
                "lable" => "student"
            ]);
        }
        
}