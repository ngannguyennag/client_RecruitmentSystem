import axios from "axios";

export const getCandidateInfo = (token) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      "http://localhost:8080/api/v1/candidate/get-info-no-token",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "GET_CANDIDATE_INFO_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_CANDIDATE_INFO_FAIL", payload: error.message });
  }
};

export const getCandidateUpdate = (token, candidate) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      "http://localhost:8080/api/v1/candidate/update-no-token",
      candidate,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    localStorage.removeItem("userInfo");
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch({ type: "CANDIDATE_UPDATE_SUCCESS", payload: data });
    return data.access_token;
  } catch (error) {
    dispatch({ type: "CANDIDATE_UPDATE_FAIL", payload: error.message });
  }
};

export const uploadImage = (token, file) => async (dispatch) => {
  if (file.entries().next().value[1] !== null) {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/candidate/profile-image",
        file,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: "UPLOAD_IMAGE_SUCCESS",
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      dispatch({ type: "UPLOAD_IMAGE_FAIL", payload: error.message });
    }
  }
};

export const uploadCV = (token, file) => async (dispatch) => {
  if (file.entries().next().value[1] !== null) {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/candidate/profile-image",
        file,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "UPLOAD_CV_SUCCESS", payload: response.data });
      return response.data;
    } catch (error) {
      dispatch({ type: "UPLOAD_CV_FAIL", payload: error.message });
    }
  }
};

export const changePassword = (token, managePassword) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      "http://localhost:8080/api/v1/candidate/changePassword?token=" + token,
      managePassword
    );
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch({ type: "CANDIDATE_UPDATE_PASSWORD_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "CANDIDATE_UPDATE_PASSWORD_FAIL",
      payload: error.message,
    });
  }
};

export const getAllCandidate = (token) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      "http://localhost:8080/api/v1/admin/manage/candidates/all",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "GET_ALL_CANDIDATE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_ALL_CANDIDATE_FAIL", payload: error.message });
  }
};

export const deleteCandidate = (candidateId, token) => async (dispatch) => {
  try {
    const { data } = await axios.delete(
      "http://localhost:8080/api/v1/admin/manage/candidates/delete/" +
        candidateId,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "DELETE_CANDIDATE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "DELETE_CANDIDATE_FAIL", payload: error.message });
  }
};

export const getCandidateByName = (name, token) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      "http://localhost:8080/api/v1/admin/manage/candidates/find?name=" + name,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "GET_CANDIDATE_BY_NAME_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_CANDIDATE_BY_NAME_FAIL", payload: error.message });
  }
};
