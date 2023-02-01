<?php

use App\Http\Controllers\testControllerAll;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/get',[testControllerAll::class,'get']);
Route::get('/get_tech',[testControllerAll::class,'get_tech']);

Route::post('/put',[testControllerAll::class,'put']);
Route::post('/put_tech',[testControllerAll::class,'put_tech']);