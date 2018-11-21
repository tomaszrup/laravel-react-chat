import { SET_MESSAGE, SEND_MESSAGE_TO } from './../actions/constants';

export default function messageReducer(state = '', action) {
  switch(action.type) {
    case SET_MESSAGE:
      return action.payload;
    case SEND_MESSAGE_TO:
      axios.post(`/api/conversation/${action.payload}`, {
        message: state
      }).then(response => {
        return state;
      });
    default:
      return state;
  }
}
