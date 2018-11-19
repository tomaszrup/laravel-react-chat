import { SET_ACTIVE_USER_ID } from './../actions/constants';

export default function activeUserIdReducer(state = 0, action){
  switch(action.type) {
    case SET_ACTIVE_USER_ID:
      return action.payload;
    default:
      return state;
  }
}
