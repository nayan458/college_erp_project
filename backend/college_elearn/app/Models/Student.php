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
        'gender',
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

    // done
    public function classes()
    {
        return $this->belongsToMany(Classe::class,'std_classes','student_id','classe_id');
    }
}
