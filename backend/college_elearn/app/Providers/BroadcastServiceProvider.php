<?php

namespace App\Providers;

use App\Models\Std_class;
use App\Policies\Std_classPolicy;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\ServiceProvider;

class BroadcastServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */

     protected $policies = [
        Std_class::class => Std_classPolicy::class,
     ];

    public function boot()
    {
        Broadcast::routes();

        require base_path('routes/channels.php');
    }
}
