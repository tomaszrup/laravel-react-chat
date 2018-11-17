import { FETCH_CONVERSATION_WITH } from './../actions/constants';

export default function conversationReducer(state = [], action){
  switch(action.type) {
    case FETCH_CONVERSATION_WITH:
      return action.payload;
    default:
      return state;
  }
}
