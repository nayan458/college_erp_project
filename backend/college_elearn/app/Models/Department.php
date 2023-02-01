<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasUuids,HasFactory;

   protected $primaryKey = 'dep_id';

    protected $fillable = [
        'dep_name'
    ];

    protected $keyType = 'string';

    public $timestamps = false;
}
