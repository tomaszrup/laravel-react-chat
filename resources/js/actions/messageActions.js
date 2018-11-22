import { SET_MESSAGE, SEND_MESSAGE_TO } from './constants';

export function setMessage(message) {
  return {
    type: SET_MESSAGE,
    payload: message
  }
}


// this doesn't really have to be an action, move it to component
export const sendMessageTo = id => (dispatch, getState) =>
  new Promise((resolve, reject) => {
    axios.post(`/api/conversation/${id}`, {
      message: getState().message
    }).then(response => {
      resolve();
    });
  });
