<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assignments_sub extends Model
{
    use HasFactory;

    protected $fillable = [
        'assignment_id',
        'student_id',
        'ass_sub_filelocation',
        'status'
    ];

    // public $timestamps = false;
    // public function assignments(){
    //     return $this->hasMany(Assignments::class,'assignment_id','assignment_id');
    // }
    
    public function assignments(){
        return $this->hasMany(Student::class,'student_id','student_id');
    }
}
