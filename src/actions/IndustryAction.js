import axios from "axios";
export const getIndustry = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/v1/industry/all"
    );
    const { data } = response;
    dispatch({ type: "GET_INDUSTRY_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_INDUSTRY_FAIL", payload: error.message });
  }
};

export const getAllIndustryByAdmin = (page) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/industry/get-all", page
      );
      dispatch({ type: "GET_ALL_INDUSTRY_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "GET_ALL_INDUSTRY_FAIL", payload: error.message });
    }
  };
  
  export const saveIndustryByAdmin = (page, token) => async(dispatch) =>{
    try{
      const {data} = await axios.post(
        "http://localhost:8080/api/v1/industry/save", page,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "SAVE_INDUSTRY_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "SAVE_INDUSTRY_FAIL", payload: error.message });
    }
  };
  
  export const deleteIndustryByAdmin = (page, token) => async(dispatch) =>{
    try{
      const {data} = await axios.post(
        "http://localhost:8080/api/v1/industry/delete", page,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "DELETE_INDUSTRY_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "DELETE_INDUSTRY_FAIL", payload: error.message });
    }
  };  