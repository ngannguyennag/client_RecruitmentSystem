import axios from "axios";

export const getAllJobByAdmin = (token) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      "http://localhost:8080/api/v1/admin/manage/jobs/all",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "GET_ALL_JOB_BY_ADMIN_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_ALL_JOB_BY_ADMIN_FAIL", payload: error.message });
  }
};

export const getJobTop = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      "http://localhost:8080/api/v1/jobs/top?pageNo=0&pageSize=6&sortBy=salary"
    );
    dispatch({ type: "JOBTOP_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "JOBTOP_FAIL", payload: error.message });
  }
};

export const getAllJobByCompany = (token) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      "http://localhost:8080/api/v1/company/manage/jobs/all",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "GET_ALL_JOB_BY_COMPANY_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_ALL_JOB_BY_COMPANY_FAIL", payload: error.message });
  }
};

export const getCompanyManageJobById = (companyId) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `http://localhost:8080/api/v1/jobs/${companyId}/all`
    );
    dispatch({ type: "GET_COMPANY_MANAGE_JOB_BY_ID_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_COMPANY_MANAGE_JOB_BY_ID_FAIL", payload: error.message });
  }
};

export const getAllJob = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("http://localhost:8080/api/v1/jobs/all");
    dispatch({ type: "GET_ALL_JOB_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_ALL_JOB_FAIL", payload: error.message });
  }
};

export const deleteJob = (jobId, token) => async (dispatch) => {
  try {
    const { data } = await axios.delete(
      "http://localhost:8080/api/v1/manage/jobs/delete/" + jobId,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "DELETE_JOB_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "DELETE_JOB_FAIL", payload: error.message });
  }
};

export const getJobByName = (name, token) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      "http://localhost:8080/api/v1/jobs/find-by-name?name=" + name,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "GET_JOB_BY_NAME_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_JOB_BY_NAME_FAIL", payload: error.message });
  }
};

export const getJobById = (jobId) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `http://localhost:8080/api/v1/job/${jobId}`
    );
    dispatch({ type: "GET_JOB_BY_ID_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_JOB_BY_ID_FAIL", payload: error.message });
  }
};

export const getJobByStatus = (jobStatus, token) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `http://localhost:8080/api/v1/company/manage/jobs?jobStatus=${jobStatus}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "GET_JOB_BY_STATUS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_JOB_BY_STATUS_FAIL", payload: error.message });
  }
};

export const createWork = (job, token) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "http://localhost:8080/api/v1/company/mamage/jobs/add",
      job,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "CREATE_WORK_SUCCESS", payload: data });
  } catch (error) {}
};
