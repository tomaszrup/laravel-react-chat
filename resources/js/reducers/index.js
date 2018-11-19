import { combineReducers } from 'redux';

import conversationReducer from './conversationReducer';
import activeUserIdReducer from './activeUserIdReducer';
import friendsReducer from './friendsReducer';
import messageReducer from './messageReducer';
import userReducer from './userReducer';

export default combineReducers({
  conversation: conversationReducer,
  user: userReducer,
  message: messageReducer,
  friends: friendsReducer,
  activeUserId: activeUserIdReducer
});
