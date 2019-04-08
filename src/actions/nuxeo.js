
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
