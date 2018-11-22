import { CACHE_CONVERSATION_WITH } from './../actions/constants';

export default function conversationCacheReducer(state = {}, action){
  switch(action.type) {
    case CACHE_CONVERSATION_WITH:
      let newState = {
        ...state
      };
      newState[action.payload.id] = action.payload.conversation;
      return newState;
    default:
      return state;
  }
}
