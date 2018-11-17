<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Helpers\Conversation;
use Illuminate\Http\Request;
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
      return [
        "asas",
        "asasa",
        "asas"
      ];
    }

    public function store(User $user) {
      return "store";
    }
}
