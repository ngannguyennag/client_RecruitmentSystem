const initialState = {
    image: null,
  };
  
  export const uploadImageReducer = (state = {}, action) => {
    switch (action.type) {
      case "UPLOAD_IMAGE_SUCCESS":
        return { ...state, image: action.payload };
      case "UPLOAD_IMAGE_FAIL":
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };
  
  export const uploadCVReducer = (state = {}, action) => {
      switch (action.type) {
        case "UPLOAD_CV_SUCCESS":
          return { ...state, image: action.payload };
        case "UPLOAD_CV_FAIL":
          return { ...state, error: action.payload };
        default:
          return state;
      }
    };
  
  export const UserSigninReducer = (state = {}, action) => {
    switch (action.type) {
      case "USER_LOGIN_SUCCESS":
        return { ...state, userInfo: action.payload };
      case "USER_LOGIN_FAIL":
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };
  
  export const UserSignupReducer = (state = {}, action) => {
    switch (action.type) {
      case "USER_SIGNUP_SUCCESS":
        return { ...state, userInfo: action.payload };
      default:
        return state;
    }
  };
  
  export const UserSignoutReducer = (state = {}, action) => {
    switch (action.type) {
      case "USER_SIGNOUT_SUCCESS":
        return { ...state };
      case "USER_SIGNOUT_FAIL":
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };
  
  export const getAllUserReducer = (state = {}, action) => {
    switch (action.type) {
      case "GET_ALL_USER": {
        return { ...state, user: action.payload };
      }
  
      case "DELETE_USER": {
        return { ...state };
      }
  
      default:
        return state;
    }
  };
  
  export const getUserByNameReducer = (state = [], action) => {
    switch (action.type) {
      case "GET_USER_BY_NAME_SUCCESS": {
        return { ...state, user: action.payload };
      }
      case "DELETE_USER": {
        return state;
      }
      default:
        return state;
    }
  };
  
  export const getAccountInfoReducer = (state = {}, action) => {
    switch (action.type) {
      case "GET_ACCOUNT_INFO_SUCCESS": {
        return { ...state, user: action.payload };
      }
      case "DELETE_USER": {
        return { ...state };
      }
      default:
        return state;
    }
  };
  
  export const getAccountUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case "GET_ACCOUNT_UPDATE": {
        return { ...state, userUpdate: action.payload };
      }
      case "USER_UPDATE_FAIL": {
        return { ...state, error: action.payload };
      }
      default:
        return state;
    }
  };
  
  export const deleteUserReducer = (state = {}, action) => {
    switch (action.type) {
      case "DELETE_USER_SUCCESS": {
        return { ...state, userUpdate: action.payload };
      }
      default:
        return state;
    }
  };
  
  export const getRecruitmentCandidateReducer = (state = {}, action) => {
    switch (action.type) {
      case "GET_RECRUITMENT_CANDIDATE_SUCCESS": {
        return { ...state, recruimentCandidate: action.payload };
      }
      case "DELETE_RECRUITMENT": {
        return { ...state };
      }
      default:
        return state;
    }
  };