<?php

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('user-channel.{userId}', function ($user, $userId) {
    return $user->id == $userId;
});

Broadcast::channel('global-channel', function ($user) {
    return true;
});
