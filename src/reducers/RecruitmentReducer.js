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
  
  export const getRecruitmentManageChangeStatusReducer = (state = {}, action) => {
    switch (action.type) {
      case "GET_RECRUITMENT_MANAGE_CHANGE_STATUS_SUCCESS":
        return { ...state, changeStatus: action.payload };
      case "GET_RECRUITMENT_MANAGE_CHANGE_STATUS_FAIL":
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };
  export const getRecruitmentManageAddInterviewReducer = (state = {}, action) =>{
    switch(action.type){
      case "GET_RECRUITMENT_MANAGE_ADD_INTERVIEW_SUCCESS":
        return { ...state, addInterview: action.payload};
      case "GET_RECRUITMENT_MANAGE_ADD_INTERVIEW_FAIL":
        return { ...state, error: action.payload};
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
  
  