import {
  FETCH_CONVERSATION_WITH,
  ADD_LOCAL_MSG_TO_CONVERSATION,
  SET_ACTIVE_USER_ID,
  FETCH_LAST_MESSAGE_WITH,
  FETCH_LAST_MESSAGES,
  CACHE_CONVERSATION_WITH
} from './constants';

export const fetchConversationWith = (id, force = false) => (dispatch, getState) =>
  new Promise((resolve, reject) => {
    let cached = getState().conversationCache[id];
    let lastMessage = getState().lastMessages[id];

    if(!force && cached && (!lastMessage || cached[cached.length - 1].id === lastMessage.id)) {
      dispatch({
        type: FETCH_CONVERSATION_WITH,
        payload: cached
      });

      resolve();
      return;
    }

    axios.get(`/api/conversation/${id}`).then(response => {
      if(getState().activeUserId !== id) return;
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


export const addLocalMsgToConversation = message => dispatch =>
  new Promise((resolve, reject) => {
    dispatch({
      type: ADD_LOCAL_MSG_TO_CONVERSATION,
      payload: message
    });
    resolve();
  });

export const setActiveUserId = id => (dispatch, getState) => {
  let conversation = getState().conversation;
  let currentId = getState().activeUserId;

  if(conversation.length &&
    (conversation[conversation.length - 1].sender_id === currentId ||
    conversation[conversation.length - 1].recipient_id === currentId))
    dispatch({
      type: CACHE_CONVERSATION_WITH,
      payload: {
        id: currentId, conversation
      }
    })

  dispatch({
    type: SET_ACTIVE_USER_ID,
    payload: id
  });

  return Promise.resolve();
}
