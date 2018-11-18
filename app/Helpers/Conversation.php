<?php
namespace App\Helpers;

use App\Models\User;

class Conversation {

  protected $sender;
  protected $recipient;

  public function __construct(User $sender, User $recipient) {
    if($recipient->id === $sender->id)
      throw new \Exception("Sender and recipient can't be the same person", 1);

    $this->sender = $sender;
    $this->recipient = $recipient;
  }

  public function getMessages() {
    $sent = $this->sender->sentMessages()->to($this->recipient)->get();
    $received = $this->sender->receivedMessages()->from($this->recipient)->get();

    $messages = $sent->merge($received)->sortByDesc('created_at');

    // needs a fix
    return array_reverse($messages->values()->toArray());
  }

}
