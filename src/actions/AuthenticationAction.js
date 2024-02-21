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

  export const getAllRoleByAdmin = (page, token) => async (dispatch) => {
    console.log(page);
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/role/get-all", page,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "GET_ALL_ROLE_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "GET_ALL_ROLE_FAIL", payload: error.message });
    }
  };

  export const saveRoleByAdmin = (page, token) => async(dispatch) =>{
    try{
      const {data} = await axios.post(
        "http://localhost:8080/api/v1/role/save", page,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "SAVE_ROLE_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "SAVE_ROLE_FAIL", payload: error.message });
    }
    };

    export const addRoleByAdmin = (page, token) => async(dispatch) =>{
      try{
        const {data} = await axios.post(
          "http://localhost:8080/api/v1/role/save", page,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch({ type: "ADD_ROLE_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "ADD_ROLE_FAIL", payload: error.message });
      }
      };

    export const deleteRoleByAdmin = (page, token) => async(dispatch) =>{
      try{
        const {data} = await axios.post(
          "http://localhost:8080/api/v1/role/delete", page,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch({ type: "DELETE_ROLE_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "DELETE_ROLE_FAIL", payload: error.message });
      }
      };
      export const pageRoleByAdmin = (page, token) => async (dispatch) => {
        try {
          const { data } = await axios.post(
            "http://localhost:8080/api/v1/role/get-all", page,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          dispatch({ type: "PAGE_ROLE_SUCCESS", payload: data });
        } catch (error) {
          dispatch({ type: "PAGE_ROLE_FAIL", payload: error.message });
        }
      };

  