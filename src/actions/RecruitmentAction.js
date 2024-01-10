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
