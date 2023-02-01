<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Teacher extends Model
{
    use HasFactory, HasApiTokens;

    protected $primaryKey = 'tech_id';

    protected $fillable = [
        'tech_fname',
        'tech_lname',
        'email',
        'username',
        'password',
        'location',
        'dep_id'
    ];

    public $timestamps = false;
}
