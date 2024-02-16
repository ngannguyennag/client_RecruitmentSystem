import axios from "axios";

export const getStatisticalByAdmin = () => async (dispatch) => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/statistic/system"
      );
      dispatch({ type: "GET_STATISTICAL_BY_ADMIN_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "GET_STATISTICAL_BY_ADMIN_FAIL", payload: error.message });
    }
  };

  export const getStatisticalByCompanyId = (companyId) => async (dispatch) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/statistic/${companyId}`
      );
      dispatch({ type: "GET_STATISTICAL_BY_COMPANY_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "GET_STATISTICAL_BY_COMPANY_FAIL", payload: error.message });
    }
  };