import axios from "axios";

export const applyJob = (jobId, token) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `http://localhost:8080/api/v1/recruitment/apply-job/${jobId}`,{},
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }
    );
    dispatch({ type: "APPLY_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "APPLY_FAIL", payload: error.message });
  }
};

export const getRecruitmentCandidate = (token) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      "http://localhost:8080/api/v1/recruitment/candidate/all",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "GET_RECRUITMENT_CANDIDATE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_RECRUITMENT_CANDIDATE_FAIL", payload: error.message });
  }
};

export const getApplicationCandidateByJobAndStatus = (jobId, statusId) => async(dispatch) =>{
  try {
    const { data } = await axios.get(
      `http://localhost:8080/api/v1/recruitment/manage/candidate?jobId=${jobId}&statusId=${statusId}`,
    );
    dispatch({ type: "GET_APPLICATION_CANDIDATE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_APPLICATION_CANDIDATE_FAIL", payload: error.message });
  }
}

export const getRecruitmentManageChangeStatus = (applicationId, status) => async(dispatch) =>{
  try{
    const {data} = await axios.post(
      `http://localhost:8080/api/v1/recruitment/manage/change-status?applicationId=${applicationId}&status=${status}`,{}
    );
    dispatch({ type: "GET_RECRUITMENT_MANAGE_CHANGE_STATUS_SUCCESS", payload: data});
  } catch(error){
    dispatch({ type: "GET_RECRUITMENT_MANAGE_CHANGE_STATUS_FAIL", payload: error.message});
  }
} 

export const getRecruitmentManageAddInterview = (applicationId, interview) => async(dispatch) =>{
  try{
    const {data} = await axios.post(
      `http://localhost:8080/api/v1/recruitment/manage/add-interview/`+ applicationId, interview
    );
    dispatch({ type: "GET_RECRUITMENT_MANAGE_ADD_INTERVIEW_SUCCESS", payload: data});
  } catch(error){
    dispatch({ type: "GET_RECRUITMENT_MANAGE_ADD_INTERVIEW_FAIL", payload: error.message});
  }
} 

export const getApplicationIntervieweeByJobAndStatus = (jobId, statusId) => async(dispatch) =>{
  try {
    const { data } = await axios.get(
      `http://localhost:8080/api/v1/recruitment/manage/interviewee?jobId=${jobId}&statusId=${statusId}`,
    );
    dispatch({ type: "GET_APPLICATION_INTERVIEWEE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_APPLICATION_INTERVIEWEE_FAIL", payload: error.message });
  }
}
