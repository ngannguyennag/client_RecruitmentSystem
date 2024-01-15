export const applyJobReducer = (state = {}, action) => {
    switch (action.type) {
      case "APPLY_SUCCESS": {
        return { ...state, apply: action.payload };
      }
      case "APPLY_FAIL": {
        return { ...state, error: action.payload };
      }
      default:
        return state;
    }
  };
  
  export const getRecruitmentCandidateReducer = (state = {}, action) => {
    switch (action.type) {
      case "GET_RECRUITMENT_CANDIDATE_SUCCESS":
        return { ...state, recruitmentCandidate: action.payload };
      case "GET_RECRUITMENT_CANDIDATE_FAIL":
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };
  
  export const getApplicationCandidateByJobAndStatusReducer = (state = {}, action) => {
    switch (action.type) {
      case "GET_APPLICATION_CANDIDATE_SUCCESS":
        return { ...state, applicationCandidate: action.payload };
      case "GET_APPLICATION_CANDIDATE_FAIL":
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };
  
  export const getApplicationIntervieweeByJobAndStatusReducer = (state = {}, action) => {
    switch (action.type) {
      case "GET_APPLICATION_INTERVIEWEE_SUCCESS":
        return { ...state, applicationInterviewee: action.payload };
      case "GET_APPLICATION_INTERVIEWEE_FAIL":
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };
  
  