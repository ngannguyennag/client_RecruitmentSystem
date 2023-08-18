import axios from 'axios'


export const getAllJob = (token) => async (dispatch, getState) => {
  const {
    userSignin: {userInfo},
  } = getState()
  try {
    const {data} = await axios.get('http://localhost:8080/api/v1/admin/manage_jobs/all', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    dispatch({type: 'GET_ALL_JOB', payload: data})
  } catch (error) {
    dispatch({type: 'GET_ALL_JOB_FAIL', payload: error.message})
  }
}
export const getJobTop = () => async (dispatch) => {
    try {
      const {data} = await axios.get('http://localhost:8080/api/v1/jobs/top?pageNo=0&pageSize=6&sortBy=salary')
      dispatch({ type: 'GET_JOBTOP_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'GET_JOBTOP_FAIL', payload: error.response.data.message });
    }
};