import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  userId: null,
  error: null,
  email: null,
  loading: false
};

const authStart = (state, action) => {
  const newState = { ...state, error: null, loading: true };
  return newState;
};

const authSuccess = (state, action) => {
  const newState = {
    ...state,
    loading: false,
    token: action.token,
    userId: action.userId,
    email: action.email
  };
  return newState;
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    default:
      return state;
  }
};

export default authReducer;
