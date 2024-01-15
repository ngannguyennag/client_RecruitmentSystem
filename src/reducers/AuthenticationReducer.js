export const LoginReducer = (state = {}, action) => {
    switch (action.type) {
      case "LOGIN_SUCCESS":
        return { ...state, userInfo: action.payload };
      case "LOGIN_FAIL":
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };
  
  export const CandidateSignUpReducer = (state = {}, action) => {
    switch (action.type) {
      case "CANDIDATE_SIGN_UP_SUCCESS":
        return { ...state, userInfo: action.payload };
      case "CANDIDATE_SIGN_UP_FAIL":
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };
  
  export const signOutReducer = (state = {}, action) => {
    switch (action.type) {
      case "SIGN_OUT_SUCCESS":
        return { ...state };
      case "SIGN_OUT_FAIL":
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };
  