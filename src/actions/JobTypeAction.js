import axios from "axios";
export const getJobType = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/v1/job-type/all"
    );
    const { data } = response;
    dispatch({ type: "GET_JOB_TYPE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_JOB_TYPE_FAIL", payload: error.message });
  }
};
export const getAllJobTypeByAdmin = (page) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/job-type/get-all", page
      );
      dispatch({ type: "GET_ALL_JOB_TYPE_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "GET_ALL_JOB_TYPE_FAIL", payload: error.message });
    }
  };
  
  export const saveJobTypeByAdmin = (page, token) => async(dispatch) =>{
    try{
      const {data} = await axios.post(
        "http://localhost:8080/api/v1/job-type/save", page,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "SAVE_JOB_TYPE_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "SAVE_JOB_TYPE_FAIL", payload: error.message });
    }
  };
  
  export const deleteJobTypeByAdmin = (page, token) => async(dispatch) =>{
    try{
      const {data} = await axios.post(
        "http://localhost:8080/api/v1/job-type/delete", page,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "DELETE_JOB_TYPE_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "DELETE_JOB_TYPE_FAIL", payload: error.message });
    }
  };