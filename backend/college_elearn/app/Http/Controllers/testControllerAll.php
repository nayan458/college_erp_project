<?php

namespace App\Http\Controllers;

use App\Exports\UsersExport;
use App\Models\Classe;
use Illuminate\Http\Request;
use App\Models\Department;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

class testControllerAll extends Controller
{
    //
    function get(){
        $department = Department::all();
        return(["Result"=>$department]);
    }

    function put(Request $req){
        $department = new Department();
        $department->dep_name = $req->dep_name;
        $department->save();
        return(["Output"=>"saved with success"]);
    }

    function get_tech(){
        $tech = Teacher::all();
        echo $tech;
        // return(["Result"=>$tech]);
    }

    function put_tech(Request $req){
        
        $dep_id = DB::table('departments')->select('dep_id')->where('dep_name',$req->dep)->first();
        DB::table('teachers')->insert([
            'tech_fname' => $req->tech_fname,
            'tech_lname' => $req->tech_lname,
            'email' => $req->email,
            'dep_id' => $dep_id->dep_id
        ]);
        return(["successfully added document"=>$dep_id]);
    }

    function get_class(){
        $classes = Classe::all();
        echo $classes;
        // return(["success"=>$classes]);
    }

    function put_class(Request $req,$id){
        $classes = new Classe();
        $classes->class_name = $req->name;
        $classes->class_desc = $req->desc;
        $classes->class_semester = $req->sem;
        $tech_id = DB::table('teachers')->select('tech_id')->where('tech_id',$id)->first();
        $classes->tech_id = $tech_id->tech_id;
        $classes->save();
        return(["success"]);
    }

    // *************************

    function put_user(Request $req){
        $user = new User();
        $user->name = $req->name;
        $user->email = $req->email;
        $user->password = $req->password;
        $user->save();
        return User::all();
    }

    public function collection(){
        return Excel::download(new UsersExport,'hello.xlsx');
    }

    public function getassignment($student_id,$class_id){
        // $result = Student::with('assignments')->where('student_id',$class_id)->first()->assignments;
        // $result = Student::with('assignments')->where('student_id',$class_id)->first()->assignments;
        $result = DB::table('assignments_subs')
                ->where('student_id',$student_id)
                ->join('assignments','assignments_subs.assignment_id','assignments.assignment_id')
                ->get();
        $query = DB::table('assignments')
            ->where('classe_id',$class_id)
            ->whereNotExists(function($query){
                $query->select(DB::raw(1))
                ->from('assignments_subs')
                ->whereRaw('assignments_subs.assignment_id = assignments.assignment_id');
            })
            ->get()
            ;
        // echo $result;
        // echo $query;
        return response()->json([
            "pending" => $query,
            "submited" => $result
        ],200);
        // $output1 = Classe::with('assignment')->where('classe_id',$req->clas_)->first()->assignment;
        // $output2 = DB::table('assignments_subs')->where('student_id',1)->get();
        // $output = $output1->join($output2, 'assignments_subs.assignment_id', '=','assignments.assignment_id')->get();
        // $output = DB::table('assignments')
        //             ->where('classe_id',$class_id)
        //             ->where('student_id',1)
        //             // ->first()->assignment
        //             ->join('assignments_subs','assignments.assignment_id','=','assignments_subs.assignment_id')
                    
        //             ->get();
        // $output = $output1->join();
        // $result = DB::table('assignments AS a')
        //     ->leftJoin('assignments_subs AS s', 'a.assignment_id', '=', 's.assignment_id')
        //     ->where('student_id',$class_id)
        //     // ->select('a.assignment_id', 'a.ass_name', 's.status')
        //     // ->whereNull('s.status')
        //     ->get();
        // $query = DB::table('assignments')
        //     // ->select('assignment_id')
        //     ->whereNotExists(function($query){
        //         $query->select(DB::raw(1))
        //         ->from('assignments_subs')
        //         ->whereRaw('assignments_subs.assignment_id = assignments.assignment_id');
        //     })
        //     ->where('classe_id',$class_id)
        //     ->get()
        //     ;
        // echo $query;
        // $result = DB::table('assignments')->whereNotExists($query);
        // echo array_column($query,'assignment_id');
        // echo $result;
        // return Student::with('assignments')->get();
        // echo DB::table('assignments')->select('assignments.*')->whereNotExists(function($query){
        //     DB::table('assignments_subs')->where('student_id',1)->get();
        // });
    }
}

// assignments_subs.assignment_id
// {
//     "assignment_id":8,
//     "ass_name":"adhar4",
//     "ass_desc":"adhar4",
//     "ass_filelocation":"assignments\/1\/1\/adhar4.pdf",
//     "classe_id":1,
//     "uploaded_at":"2023-02-2319:41:59"
// }
