import { SET_MESSAGE, SEND_MESSAGE_TO } from './constants';

export function setMessage(message) {
  return {
    type: SET_MESSAGE,
    payload: message
  }
}

export function sendMessageTo(id) {
  return {
    type: SEND_MESSAGE_TO,
    payload: id
  }
}
