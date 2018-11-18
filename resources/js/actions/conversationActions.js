import { FETCH_CONVERSATION_WITH, ADD_LOCAL_MSG_TO_CONVERSATION } from './constants';

export function fetchConversationWith(id) {
  return function(dispatch) {
    return axios.get('/api/conversation/'+id).then(
      response => dispatch({
        type: FETCH_CONVERSATION_WITH,
        payload: response.data
      })
    );
  }
}
export function addLocalMsgToConversation(message) {
  return {
    type: ADD_LOCAL_MSG_TO_CONVERSATION,
    payload: message
  }
}
