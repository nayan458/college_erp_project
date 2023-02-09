<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Student extends Authenticatable
{
    use HasFactory, HasApiTokens, Notifiable;

    protected $gaurd = 'student';

    protected $primaryKey = 'student_id';

    protected $fillable = [
        'fname',
        'lname',
        'email',
        'password',
        'username',
        'location',
        'std_semester',
        'dep_id'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public $timestamps = false;

    // one student can be registered to many classes
    public function Std_class(){
        return $this->hasMany(Std_class::class,'student_id','student_id');
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function classes()
    {
        return $this->belongsTo(Classes::class);
    }
}
