<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\BelongsToRelationship;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Std_class extends Model
{
    use HasFactory;
    protected $primaryKey = 'student_id';

    protected $fillable = [
        'classe_id',
        'student_id'
    ];
    
    public $timestamps = false;
    
}
