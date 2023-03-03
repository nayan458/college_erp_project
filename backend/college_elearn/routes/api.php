<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthenticationController;
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
|| Here is where we can register API routes for our application. These
|| routes are loaded by the RouteServiceProvider within a group which
|| is assigned the "api" middleware group.
||
*/

Route::group(['middleware' => 'auth:sanctum'],function () {
    Route::controller(StudentsController::class)->group(function(){
        Route::get('student/myData','myData');
    });
    Route::controller(TeachersController::class)->group(function(){
        Route::get('teacher/myData','myData');
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

    Route::controller(TeachersController::class)->prefix('teacher')->group(function(){

        // teacher view classes(done)
        Route::get('/classes/{username}','view_class');
        
        // view students in a class(done)
        // Route::get('classStudents/{class_id}','view_student_class');
        Route::get('/classmate/{student_id}/{class_id}','view_student_class');

        // Teacher view assignments(done)
        Route::get('/viewAssignments/{tech_id}/{class_id}','view_assignment');

        // teacher add assignments(done)
        Route::post('/submit_assignment/{tech_id}/{class_id}','add_assignment');

        // teacher download added assignment
        Route::get('/download/{tech_id}/{class_id}/{ass_id}','download_assignment');

        // teacher view assignments submissions(pending)
        Route::get('assignmentSubmition/{assignment_id}','view_assignment_submition');

        // teacher download students assignment
        Route::get('downloadStudentAsssignment/{ass_id}/{student_id}','download_student_assignment_submissions');

        // teacher update student submmision status
        Route::post('assignmentStatus','assignment_status');

        // teacher delete assignment
        Route::delete('deleteAssignment/{ass_id}','deleteAssignment');
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

    Route::controller(StudentsController::class)->prefix('student')->group(function(){
        // Student view classes(done)
        Route::get('/classes/{student_id}','view_classes');

        // Studnet view assignments(need schema update)
        Route::get('/viewAssignments/{student_id}/{class_id}','view_assignment');
        // Student download assignment(done)
        Route::get('/download/{student_id}/{class_id}/{ass_id}','download_assignment');

        // Studnet submit assignments(done)
        Route::post('/submit_assignment/{student_id}/{class_id}','submit_assignment');
        // Studnet view quiz

        // Student submit quiz

        // student view classmats(done)
        Route::get('/classmate/{student_id}/{class_id}','view_classmates');

        // Route::get('/myData','myData');

    });

    
    
});;

Route::controller(AuthenticationController::class)->group(function(){
    Route::post('/logout','logout');
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
    // Register teachers
        Route::post('/registerTeacher','register_teachers');
    // Register students
        Route::post('/registerStudent','register_students');
    // Register classes and asiign teachers
        Route::post('/registerClasses','register_classes');
    // Add student to classes
        Route::post('/addStudentsToClass','add_students_to_class');


    // View Departments
        Route::get('/allDepartments','view_departments');
    // view teachers
        Route::get('/allTeachers','all_teachers');
    // view students
        Route::get('/allStudents','all_students');
    // view students
        Route::get('/allClasses','all_classes');
    


    // Delete Department
        Route::delete('/deleteDepartment','delete_department');
    // delete teachers
        Route::delete('/deleteTeacher','delete_teachers');
    // delete students
        Route::delete('/deleteStudent','delete_students');
      

    // admin create classes
    
});

Route::controller(AuthenticationController::class)->group(function(){
    Route::post('student/login','studentLogin');
    Route::post('teacher/login','teacherLogin');
    Route::post('/updatePassword','updatePassword');
});