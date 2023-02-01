<?php

namespace App\Http\Controllers;

use App\Exports\UsersExport;
use App\Models\Classe;
use Illuminate\Http\Request;
use App\Models\Department;
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
        return(["Result"=>$tech]);
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
        return(["success"=>$classes]);
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
}
