import {
  FETCH_CONVERSATION_WITH,
  ADD_LOCAL_MSG_TO_CONVERSATION,
  SET_ACTIVE_USER_ID,
  FETCH_LAST_MESSAGE_WITH,
  FETCH_LAST_MESSAGES
} from './constants';

export const fetchConversationWith = id => dispatch =>
  new Promise((resolve, reject) => {
    axios.get(`/api/conversation/${id}`).then(response => {
      dispatch({
        type: FETCH_CONVERSATION_WITH,
        payload: response.data
      });
      dispatch({
        type: FETCH_LAST_MESSAGE_WITH,
        payload: {
          id: id,
          message: response.data[response.data.length - 1]
        }
      });
      resolve();
    });
  });

export const fetchLastMessageWith = id => dispatch =>
  new Promise((resolve, reject) => {
    axios.get(`/api/conversation/last/${id}`).then(response => {
      dispatch({
        type: FETCH_LAST_MESSAGE_WITH,
        payload: {
          id: id,
          message: response.data
        }
      });
      resolve();
    });
  });

export const fetchLastMessages = () => dispatch =>
  new Promise((resolve, reject) => {
    axios.get('/api/conversation/last').then(response => {
      dispatch({
        type: FETCH_LAST_MESSAGES,
        payload: response.data
      });
    })
  });


export function addLocalMsgToConversation(message) {
  return {
    type: ADD_LOCAL_MSG_TO_CONVERSATION,
    payload: message
  }
}

export const setActiveUserId = id => dispatch => {
  dispatch({
    type: SET_ACTIVE_USER_ID,
    payload: id
  });

  return Promise.resolve();
}
