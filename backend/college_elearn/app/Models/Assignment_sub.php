<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assignment_sub extends Model
{
    use HasFactory;

    protected $fillable = [
        'assignment_id',
        'student_id',
        'ass_sub_filelocation',
        'status'
    ];

    // public $timestamps = false;
}
