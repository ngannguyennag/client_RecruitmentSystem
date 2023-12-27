import axios from 'axios'

export const getAllJobByAdmin = (token) => async (dispatch, getState) => {
  const {
    userSignin: {userInfo},
  } = getState()
  try {
    const {data} = await axios.get('http://localhost:8080/api/v1/admin/manage/jobs/all', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    dispatch({type: 'GET_ALL_JOB_BY_ADMIN_SUCCESS', payload: data})
  } catch (error) {
    dispatch({type: 'GET_ALL_JOB_BY_ADMIN_FAIL', payload: error.message})
  }
}
export const getJobTop = () => async (dispatch) => {
    try {
      const {data} = await axios.get('http://localhost:8080/api/v1/jobs/top?pageNo=0&pageSize=6&sortBy=salary')
      dispatch({ type: 'JOBTOP_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'JOBTOP_FAIL', payload: error.message});
    }
};

export const getAllJobByCompany = (token) => async (dispatch, getState) => {
  const {
    userSignin: {userInfo},
  } = getState()
  try {
    const {data} = await axios.get('http://localhost:8080/api/v1/company/manage/jobs/all', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    dispatch({type: 'GET_ALL_JOB_BY_COMPANY_SUCCESS', payload: data})
  } catch (error) {
    dispatch({type: 'GET_ALL_JOB_BY_COMPANY_FAIL', payload: error.message})
  }
}

export const getAllJob = () => async (dispatch, getState) => {
  const {
    userSignin: {userInfo},
  } = getState()
  try {
    const {data} = await axios.get('http://localhost:8080/api/v1/jobs/all')
    dispatch({type: 'GET_ALL_JOB_SUCCESS', payload: data})
  } catch (error) {
    dispatch({type: 'GET_ALL_JOB_FAIL', payload: error.message})
  }
}

export const deleteJob = (jobId, token) => async (dispatch, getState) => {
  const {
    userSignin: {userInfo},
  } = getState()
  try {
    const {data} = await axios.delete('http://localhost:8080/api/v1/manage/jobs/delete/'+ jobId,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    dispatch({type: 'DELETE_JOB_SUCCESS', payload: data})
  } catch (error) {
    dispatch({type: 'DELETE_JOB_FAIL', payload: error.message})
  }
}

export const getJobByName = (name, token) => async (dispatch, getState) =>{
  const {
    userSignin: {userInfo},
  } = getState()
  try {
    const {data} = await axios.get('http://localhost:8080/api/v1/jobs/find?name=' +name,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    dispatch({type: 'GET_JOB_BY_NAME_SUCCESS', payload: data})
  } catch(error){
    dispatch({type:'GET_JOB_BY_NAME_FAIL', payload: error.message})
  }
}

export const createWork = (job, token) => async (dispatch) => {
  try {
    const {data} = await axios.post('http://localhost:8080/api/v1/company/mamage/jobs/add', job, {
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
    // localStorage.setItem('createWork', JSON.stringify(data));
    dispatch({ type: 'CREATE_WORK_SUCCESS', payload: data });
  } catch (error) {
    // dispatch({type:'CREATE_WORK_FAIL', payload: error.message})
  }
};