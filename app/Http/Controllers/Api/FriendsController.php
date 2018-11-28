<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\ApiController;
use Illuminate\Support\Facades\Auth;
use App\Helpers\Conversation;
use Illuminate\Http\Request;
use App\Models\User;

class FriendsController extends ApiController
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

      // Fetch friends
      $friends = User::where('id', "!=", Auth::id())->get();

      return $this->respond($friends);
    }


}
