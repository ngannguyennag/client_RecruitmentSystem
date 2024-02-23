import axios from "axios";
export const getSkill = () => async (dispatch) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/skill/all"
      );
      const { data } = response;
      dispatch({ type: "GET_SKILL_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "GET_SKILL_FAIL", payload: error.message });
    }
  };
export const getAllSkillByAdmin = (page, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(
            "http://localhost:8080/api/v1/skill/get-all", page,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        dispatch({ type: "GET_ALL_SKILL_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "GET_ALL_SKILL_FAIL", payload: error.message });
    }
};

export const saveSkillByAdmin = (page, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(
            "http://localhost:8080/api/v1/skill/save", page,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        dispatch({ type: "SAVE_SKILL_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "SAVE_SKILL_FAIL", payload: error.message });
    }
};

export const addSkillByAdmin = (page, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(
            "http://localhost:8080/api/v1/skill/save", page,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        dispatch({ type: "ADD_SKILL_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "ADD_SKILL_FAIL", payload: error.message });
    }
};

export const deleteSkillByAdmin = (page, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(
            "http://localhost:8080/api/v1/skill/delete", page,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        dispatch({ type: "DELETE_SKILL_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "DELETE_SKILL_FAIL", payload: error.message });
    }
};
export const pageSkillByAdmin = (page, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(
            "http://localhost:8080/api/v1/skill/get-all", page,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        dispatch({ type: "PAGE_SKILL_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "PAGE_SKILL_FAIL", payload: error.message });
    }
}; 