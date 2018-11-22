<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use Carbon\Carbon;

class Message extends Model
{
    protected $guarded = ['id'];

    function scopeTo($query, User $to) {
      return $query->where('recipient_id', $to->id);
    }

    function scopeFrom($query, User $from) {
      return $query->where('sender_id', $from->id);
    }

    function scopeRead($query) {
      $now = Carbon::now();
      $copy = $query;
      $copy->update(["read_at" => $now]);
      return $query;
    }
}
