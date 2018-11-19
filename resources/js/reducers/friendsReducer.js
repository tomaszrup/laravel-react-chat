import { FETCH_FRIENDS } from './../actions/constants';

export default function friendsReducer(state = [], action){
  switch(action.type) {
    case FETCH_FRIENDS:
      return action.payload;
    default:
      return state;
  }
}
