<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Helpers\Conversation;
use Illuminate\Http\Request;
use App\Events\MessageSent;
use App\Models\Message;
use App\Models\User;

class ConversationController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(User $user) {
      // Fetch conversation
      $conversation = new Conversation(Auth::user(), $user);

      return $conversation->messages(40);
    }

    public function store(Request $request, User $user) {

      // Needs better validation
      if(!$request->message) return;

      $message = [
        'sender_id' => Auth::id(),
        'recipient_id' => $user->id,
        'body' => $request->message
      ];

      $message = Message::create($message);

      event(new MessageSent($message));
    }
}
