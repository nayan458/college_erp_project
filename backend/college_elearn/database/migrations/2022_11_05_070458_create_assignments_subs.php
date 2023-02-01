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
        Schema::create('assignments_subs', function (Blueprint $table) {
            $table->bigInteger('assignment_id')->unsigned();
            $table->bigInteger('student_id')->unsigned();

            $table->foreign('assignment_id')->references('assignment_id')->on('assignments')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('student_id')->references('student_id')->on('students')->onUpdate('cascade')->onDelete('cascade');

            $table->enum('status',['pending','submitted','approve','rejected']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('assignments_subs');
    }
};
