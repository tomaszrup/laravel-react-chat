import { FETCH_USER } from './constants';

export const fetchUser = () => (dispatch) =>
  new Promise(function(resolve, reject) {
    axios.get('/api/user').then(response => {
      dispatch({
        type: FETCH_USER,
        payload: response.data
      });
      resolve();
    });
  });
