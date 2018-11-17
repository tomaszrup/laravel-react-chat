<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'name', 'email', 'password',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    public function sentMessages() {
      return $this->hasMany('App\Models\Message', 'sender_id');
    }

    public function receivedMessages() {
      return $this->hasMany('App\Models\Message', 'recipient_id');
    }

}
