<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id('student_id')->unique();
            $table->string('fname')->require();
            $table->string('lname')->require();
            $table->string('email')->require();
            $table->string('username')->require();
            $table->string('password')->require();
            $table->string('location');
            $table->string('std_semester');
            $table->uuid('dep_id');
            $table->foreign('dep_id')->references('dep_id')->on('departments')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('students');
    }
};
