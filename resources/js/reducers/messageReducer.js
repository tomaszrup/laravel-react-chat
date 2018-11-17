import { SET_MESSAGE, SEND_MESSAGE_TO } from './../actions/constants';

export default function(state = '', action) {
  switch(action) {
    case SET_MESSAGE:
      return action.payload;
    case SEND_MESSAGE_TO:
      axios.post('/api/conversation/'+action.payload, state).then(response => {
        return '';
      });
    default:
      return state;
  }
}
