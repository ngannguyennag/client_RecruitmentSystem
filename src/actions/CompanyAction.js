import axios from 'axios'

export const company = () => async (dispatch) => {
    try {
      const {data} = await axios.get('http://localhost:8080/api/v1/companies/top?pageNo=0&pageSize=6&sortBy=companyId')
      dispatch({ type: 'COMPANY_SUCCESS', payload: data });
    //   localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: 'COMPANY_FAIL', payload: error.response.data.message });
    }
};