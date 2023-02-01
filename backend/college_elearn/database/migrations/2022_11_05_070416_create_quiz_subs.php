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
        Schema::create('quiz_subs', function (Blueprint $table) {
            $table->bigInteger('quiz_id')->unsigned();
            $table->bigInteger('student_id')->unsigned();

            $table->foreign('quiz_id')->references('quiz_id')->on('quizs')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('student_id')->references('student_id')->on('students')->onUpdate('cascade')->onDelete('cascade');

            $table->enum('status',['pending','submited','approved','rejected']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('quiz_subs');
    }
};
