import { FETCH_CONVERSATION_WITH, ADD_LOCAL_MSG_TO_CONVERSATION } from './../actions/constants';

export default function conversationReducer(state = [], action){
  switch(action.type) {
    case FETCH_CONVERSATION_WITH:
      return action.payload;
    case ADD_LOCAL_MSG_TO_CONVERSATION:
      state.push({body: action.payload});
      return state;
    default:
      return state;
  }
}
