<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Teacher extends Authenticatable
{
    use HasFactory, HasApiTokens, Notifiable;

    protected $guard = 'teacher';

    protected $primaryKey = 'tech_id';

    protected $fillable = [
        'tech_fname',
        'tech_lname',
        'email',
        'gender',
        'username',
        'password',
        'location',
        'dep_id'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public $timestamps = false;

    // done
    function view_classes(){
        return $this->hasManyThrough(Classe::class,Teacher::class,'tech_id','tech_id');
    }
}