import axios from 'axios'

export const getCompany = () => async (dispatch) => {
    try {
      const {data} = await axios.get('http://localhost:8080/api/v1/companies/top?pageNo=0&pageSize=6&sortBy=companyId')
      dispatch({ type: 'GETCOMPANY_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'GETCOMPANY_FAIL', payload: error.response.data.message });
    }
};


export const getAllCompany = (token) => async (dispatch, getState) => {
  const {
    userSignin: {userInfo},
  } = getState()
  try {
    const {data} = await axios.get('http://localhost:8080/api/v1/manage_companies/all', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    dispatch({type: 'GET_ALL_COMPANY', payload: data})
  } catch (error) {
    dispatch({type: 'GET_ALL_COMPANY_FAIL', payload: error.message})
  }
}