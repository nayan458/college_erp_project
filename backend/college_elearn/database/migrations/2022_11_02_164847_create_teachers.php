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
        Schema::create('teachers', function (Blueprint $table) {
            $table->id('tech_id')->unique();
            $table->string('tech_fname')->require();
            $table->string('tech_lname')->require();
            $table->string('email')->require()->unique();
            $table->string('gender');
            $table->string('username')->unique()->require();
            $table->string('password')->require();
            $table->string('location');
            $table->uuid('dep_id')->require();
            $table->foreign('dep_id')->references('dep_id')->on('departments')->onUpdate('cascade')->onDelete('cascade');
            $table->rememberToken();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('teachers');
    }
};
