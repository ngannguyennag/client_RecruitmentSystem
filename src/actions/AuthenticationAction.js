import axios from "axios";

export const login = (account) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "http://localhost:8080/api/v1/auth/login",
      account
    );
    dispatch({ type: "LOGIN_SUCCESS", payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: "LOGIN_FAIL", payload: error.message });
  }
};

export const signUpCandidate = (candidate) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "http://localhost:8080/api/v1/auth/register",
      candidate
    );
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch({ type: "CANDIDATE_SIGN_UP_SUCCESS", payload: data });
    document.location.href = "/";
  } catch (error) {
    dispatch({ type: "CANDIDATE_SIGN_UP_FAIL", payload: error.message });
  }
};

export const signOut = () => async (dispatch) => {
    try {
      // await axios.get('http://localhost:8080/api/v1/auth/logout')
      localStorage.removeItem("userInfo");
      dispatch({ type: "SIGN_OUT_SUCCESS", payload: {} });
      document.location.href = "/";
    } catch (error) {
      dispatch({ type: "SIGN_OUT_FAIL", payload: error.message });
    }
  };