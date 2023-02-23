<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assignment extends Model
{
    use HasFactory;

    protected $primaryKey = 'assignment_id';

    protected $fillable = [
        'ass_name',
        'ass_desc',
        'uploaded_at',
        'ass_filelocation'
    ];

    // public $timestamps = false;
}
