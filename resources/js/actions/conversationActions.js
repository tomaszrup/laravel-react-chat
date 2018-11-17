import { FETCH_CONVERSATION_WITH } from './constants';

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
