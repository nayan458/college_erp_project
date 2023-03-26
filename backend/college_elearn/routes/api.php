<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\StudentsController;
use App\Http\Controllers\TeachersController;
use Illuminate\Support\Facades\Route;

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

    /*
    ||--------------------------------------------------------------------------
    || TEACHERS Routes
    ||--------------------------------------------------------------------------
    ||
    || Here are teacher routes that are used to define.
    || routes are loaded by the TeachersController
    ||
    */

    Route::controller(TeachersController::class)->prefix('teacher')->middleware(['abilities:Teacher'])->group(function(){

        Route::get('myData','myData');

        // teacher view classes(done)(same)
        Route::get('/classes','view_class');
        
        // view students in a class(done)(authenticated)
        Route::get('/classmate/{classe}','view_student_class');

        // Teacher view assignments(done)(authenticated)
        Route::get('/viewAssignments/{classe}','view_assignment');

        // teacher add assignments(done)(authenticated)
        Route::post('/submit_assignment/{classe}','add_assignment');

        // teacher download added assignment(authenticated)
        Route::get('/download/{assignment}','download_assignment');

        // teacher view assignments submissions(done)(authenticated)
        Route::get('assignmentSubmition/{assignment}','view_assignment_submition');

        // teacher download students assignment(authenticated)
        Route::get('/downloadStudentAsssignment/{assignment}/{student_id}','download_student_assignment_submissions');

        // teacher update student submmision status(authenticated)
        Route::post('assignmentStatus','assignment_status');

        // teacher delete assignment(authenticated)
        Route::delete('deleteAssignment/{assignment}','deleteAssignment');
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

    Route::controller(StudentsController::class)->prefix('student')->middleware(['abilities:Student'])->group(function(){

        // geting personal details
        Route::get('myData','myData');
        
        // Student view classes(done)(authenticated)
        Route::get('/classes','view_classes');

        // Studnet view assignments(done)(authenticated)
        Route::get('/viewAssignments/{classe}','view_assignment');

        // Student download assignment(done)
        Route::get('/download/{assignment}','download_assignment');

        // Studnet submit assignments(done)
        Route::post('/submit_assignment','submit_assignment');

        // student view classmats(done)
        Route::get('/classmate/{classe}','view_classmates');

    });

    /*
    ||--------------------------------------------------------------------------
    || AUTHENTICATION Routes for Teacher and Student
    ||--------------------------------------------------------------------------
    ||
    || Here are Student routes that are used to define.
    || routes are loaded by the StudentsController  
    ||
    */
    
    Route::controller(AuthenticationController::class)->group(function(){
        Route::post('logout','logout');
        Route::post('islogin','is_login');
    });
    
    
});;

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
    // update password
});