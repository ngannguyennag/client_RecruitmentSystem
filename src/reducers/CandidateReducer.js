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

export const getAllCandidateReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_ALL_CANDIDATE_SUCCESS":
      return { ...state, candidates: action.payload };
    case "GET_ALL_CANDIDATE_FAIL":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const getCandidateByNameReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_CANDIDATE_BY_NAME_SUCCESS":
      return { ...state, candidates: action.payload };
    case "GET_CANDIDATE_BY_NAME_FAIL":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const getCandidateInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_CANDIDATE_INFO_SUCCESS":
      return { ...state, candidate: action.payload };
    case "GET_CANDIDATE_INFO_FAIL":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const getCandidateUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case "CANDIDATE_UPDATE_SUCCESS": 
      return { ...state, userUpdate: action.payload };
    case "CANDIDATE_UPDATE_FAIL": 
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const deleteCandidateReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_CANDIDATE_SUCCESS":
      return { ...state };
    case "DELETE_CANDIDATE_FAIL":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};


