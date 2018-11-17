import { combineReducers } from 'redux';

import conversationReducer from './conversationReducer';
import messageReducer from './messageReducer';
import userReducer from './userReducer';

export default combineReducers({
  conversation: conversationReducer,
  user: userReducer,
  message: messageReducer
});
