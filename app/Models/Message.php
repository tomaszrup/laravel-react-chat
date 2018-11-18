<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Message extends Model
{
    protected $guarded = ['id'];

    function scopeTo($query, User $to) {
      return $query->where('recipient_id', $to->id);
    }

    function scopeFrom($query, User $from) {
      return $query->where('sender_id', $from->id);
    }
}
