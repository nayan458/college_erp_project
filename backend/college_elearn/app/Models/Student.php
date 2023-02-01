<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Student extends Model
{
    use HasFactory, HasApiTokens, Notifiable;
    
    protected $primaryKey = 'student_id';

    protected $filable = [
        'fname',
        'lname',
        'email',
        'username',
        'password',
        'location',
        'std_semester',
    ];

    public $timestamps = false;

    // one student can be registered to many classes
    public function Std_class(){
        return $this->hasMany(Std_class::class,'student_id','student_id');
    }
}
