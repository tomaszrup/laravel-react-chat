import { FETCH_LAST_MESSAGE_WITH, FETCH_LAST_MESSAGES } from './../actions/constants';

export default function lastMessagesReducer(state = {}, action){
  switch(action.type) {
    case FETCH_LAST_MESSAGES:
      return action.payload;
    case FETCH_LAST_MESSAGE_WITH:
      let newState = {
        ...state
      };
      newState[action.payload.id] = action.payload.message;
      return newState;
    default:
      return state;
  }
}
