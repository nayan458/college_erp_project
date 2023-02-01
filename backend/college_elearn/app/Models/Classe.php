<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classe extends Model
{
    use HasFactory;
    protected $primaryKey = 'classe_id';

    protected $fillable = [
        'class_name',
        'class_desc',
        'class_semester',
    ];

    public $timestamps = false;

    public function students(){
        return $this->hasMany(Std_clas::class,'classe_id','classe_id');
    }

    public function assignment(){
        return $this->hasMany(Assignment::class,'classe_id','classe_id');
    }

}
