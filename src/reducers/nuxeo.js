
export const initialState = {
  authentication: null,
};

export const types = {
  AUTHENTICATE: 'AUTHENTICATE',
  CLEAR_AUTHENTICATION: 'CLEAR_AUTHENTICATION',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.AUTHENTICATE:
      return {
        ...state,
        authentication: action.payload,
      };
    case types.CLEAR_AUTHENTICATION:
      return {
        ...state,
        authentication: null,
      };
    default:
      return state;
  }
};
