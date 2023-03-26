<?php

namespace App\Policies;

use App\Models\Assignment;
use App\Models\Classe;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Facades\DB;

class AssignmentPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(User $user)
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Assignment  $assignment
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function student_view_assignments(Student $user, Assignment $assignment) : bool
    {
        // find the class assignment belongs to
        // student should belong to that class
        return DB::table('std_classes')
            ->where('student_id',$user->student_id)
            ->where('classe_id',$assignment->classe_id)
            ->exists();
    }

    public function teacher_view_assignment(Teacher $teacher, Assignment $assignment) : bool
    {
        return DB::table('classes')
            ->where('classe_id',$assignment->classe_id)
            ->where('tech_id',$teacher->tech_id)
            ->exists()
        ;
    }
    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Assignment  $assignment
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Assignment $assignment)
    {
        //
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Assignment  $assignment
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Assignment $assignment)
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Assignment  $assignment
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, Assignment $assignment)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Assignment  $assignment
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Assignment $assignment)
    {
        //
    }
}
