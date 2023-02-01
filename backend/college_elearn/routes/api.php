<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\StudentsController;
use App\Http\Controllers\TeachersController;
use App\Http\Controllers\testControllerAll;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Maatwebsite\Excel\Row;

/*
||--------------------------------------------------------------------------
|| API Routes
||--------------------------------------------------------------------------
||
|| Here is where you can register API routes for your application. These
|| routes are loaded by the RouteServiceProvider within a group which
|| is assigned the "api" middleware group. Enjoy building your API!
||
*/


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::controller(testControllerAll::class)->group(function(){

    Route::get('/get','get');
    Route::get('/get_tech','get_tech');
    
    Route::post('/put','put');
    Route::post('/put_tech','put_tech');
    Route::get('/get_cls','get_class');
    Route::post('/put_cls/{tech_name}','put_class');

    Route::post('/user','put_user');
    Route::get('/export','collection');
});



/*
||--------------------------------------------------------------------------
|| ADMIN Routes
||--------------------------------------------------------------------------
||
|| Here are admin routes that are used to define.
|| routes are loaded by the AdminController 
||
*/


Route::controller(AdminController::class)->group(function(){
    // Register Department

    Route::post('/registerDepartment','register_department');

    // Delete Department

    Route::delete('/deleteDepartment','delete_department');

    // View Departments

    Route::get('/allDepartments','view_departments');

    // Register teachers
    Route::post('/registerTeacher','register_teachers');
    
    // Register students
    Route::post('/registerStudent','register_students');
    
    // view teachers
    Route::get('/allTeachers','all_teachers');
    
    // view students
    Route::get('/allStudents','all_students');

    // view teachers
    Route::delete('/deleteTeacher','delete_teachers');
    
    // view students
    Route::delete('/deleteStudent','delete_students');
});



/*
||--------------------------------------------------------------------------
|| TEACHERS Routes
||--------------------------------------------------------------------------
||
|| Here are teacher routes that are used to define.
|| routes are loaded by the TeachersController
||
*/


Route::controller(TeachersController::class)->group(function(){
    // teacher creates class
    Route::post('/createClass/{username}','create_class');

    // teacher add students

    Route::post('/addStudents/{username}/{class_id}','add_students');

    // teacher add assignments

    Route::post('putAssignments/{username}/{class_id}','add_assignment');
    // teacher add quiz

    // teacher view classes

    Route::get('/classes/{username}','view_class');

    // view students in a class

    Route::get('classStudents/{username}/{class_id}','view_student_class');

    // teacher view assignments submitions

    // teacher grades or validates submited assignments
    
    // teacher view quiz submitions
    
    // teacher grades or validates submited quiz

    Route::any('/any','getall');
});



/*
||--------------------------------------------------------------------------
|| STUDENTS Routes
||--------------------------------------------------------------------------
||
|| Here are Student routes that are used to define.
|| routes are loaded by the StudentsController  
||
*/


Route::controller(StudentsController::class)->group(function(){
    // Student view classes
    Route::get('/class/{uername}','view_classes');

    // Studnet view assignments
    // Route::get('/assignments/{$class_id}');
    Route::get('/viewAssignments/{username}/{class_id}','view_assignment');

    // Student download assignment
    Route::get('/download/{username}/{class_id}/{ass_id}','download_assignment');

    // Studnet submit assignments
    Route::post('/submit_assignment/{username}/{class_id}','submit_assignment');
    // Studnet view quiz

    // Student submit quiz

    // student view classmats
    Route::get('/classmate/{username}/{class}','view_classmates');

});