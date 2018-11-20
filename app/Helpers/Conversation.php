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

  public function messages($amount) {
    $sent = $this->sender->sentMessages()->to($this->recipient)->orderBy('created_at', 'desc')->take($amount / 2)->get();
    $received = $this->sender->receivedMessages()->from($this->recipient)->orderBy('created_at', 'desc')->take($amount / 2)->get();

    $messages = $sent->merge($received)->sortByDesc('created_at');

    return array_reverse($messages->values()->toArray());
  }

  public function lastMessage() {
    $messages = $this->messages(2);

    return (count($messages) ? $messages[count($messages) - 1] : []);
  }

}
