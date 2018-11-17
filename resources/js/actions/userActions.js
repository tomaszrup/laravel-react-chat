import { FETCH_USER } from './constants';

export function fetchUser() {
  return function(dispatch) {
    return axios.get('/api/user').then(
      response => dispatch({
        type: FETCH_USER,
        payload: response.data
      })
    );
  }
}
