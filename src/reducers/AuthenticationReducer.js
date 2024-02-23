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

export const getAllRoleReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_ALL_ROLE_SUCCESS":
      return { ...state, role: action.payload };
    case "GET_ALL_ROLE_FAIL":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const saveRoleByAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case "SAVE_ROLE_SUCCESS":
      return { ...state, saveRole: action.payload };
    case "SAVE_ROLE_FAIL":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export const addRoleByAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_ROLE_SUCCESS":
      return { ...state, addRole: action.payload };
    case "ADD_ROLE_FAIL":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export const deleteRoleByAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_ROLE_SUCCESS":
      return { ...state, deleteRole: action.payload };
    case "DELETE_ROLE_FAIL":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
export const pageRoleByAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case "PAGE_ROLE_SUCCESS":
      return { ...state, pageRole: action.payload };
    case "PAGE_ROLE_FAIL":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

