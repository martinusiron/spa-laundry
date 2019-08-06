<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
        	'name' => 'baron',
        	'email' => 'baron@gmail.com',
        	'email_verified_at' => now(),
        	'password' => bcrypt('secret'),
        	'role' => 0
        ]);
    }
}
