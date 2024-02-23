import axios from "axios";
export const getDegree = () => async (dispatch) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/degree/all"
      );
      const { data } = response;
      dispatch({ type: "GET_DEGREE_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "GET_DEGREE_FAIL", payload: error.message });
    }
  };
export const getAllDegreeByAdmin = (page, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(
            "http://localhost:8080/api/v1/degree/get-all", page,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        dispatch({ type: "GET_ALL_DEGREE_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "GET_ALL_DEGREE_FAIL", payload: error.message });
    }
};

export const saveDegreeByAdmin = (page, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(
            "http://localhost:8080/api/v1/degree/save", page,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        dispatch({ type: "SAVE_DEGREE_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "SAVE_DEGREE_FAIL", payload: error.message });
    }
};

export const addDegreeByAdmin = (page, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(
            "http://localhost:8080/api/v1/degree/save", page,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        dispatch({ type: "ADD_DEGREE_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "ADD_DEGREE_FAIL", payload: error.message });
    }
};

export const deleteDegreeByAdmin = (page, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(
            "http://localhost:8080/api/v1/degree/delete", page,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        dispatch({ type: "DELETE_DEGREE_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "DELETE_DEGREE_FAIL", payload: error.message });
    }
};
export const pageDegreeByAdmin = (page, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(
            "http://localhost:8080/api/v1/degree/get-all", page,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        dispatch({ type: "PAGE_DEGREE_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "PAGE_DEGREE_FAIL", payload: error.message });
    }
}; 