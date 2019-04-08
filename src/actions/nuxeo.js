
import { types } from 'reducers/nuxeo';
import { basicAuth } from 'apis/nuxeo';

export const authenticate = () =>
  (dispatch, getState) => {
    const nuxeo = basicAuth();
    dispatch({
      type: types.AUTHENTICATE,
      payload: nuxeo,
    });
  };

export const clearAuthenticate = () =>
  (dispatch, getState) => {
    dispatch({
      type: types.CLEAR_AUTHENTICATION,
    });
  };
