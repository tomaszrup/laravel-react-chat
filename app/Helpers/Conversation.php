<?php
namespace App\Helpers;

use App\Models\User;

class Conversation {

  protected $sender;
  protected $recipient;

  public function __construct(User $sender, User $recipient) {
    if($recipient === $sender)
      throw new \Exception("Sender and recipient can't be the same person", 1);

    $this->sender = $sender;
    $this->recipient = $recipient;
  }

  public function getMessage() {
    $sent = $sender->sentMessages()->to($recipient)->get();
    $received = $sender->receivedMessages()->from($recipient)->get();
    $messages = $sent->merge($received)->sortBy('created_at', 'desc');

    return $messages;
  }

}
