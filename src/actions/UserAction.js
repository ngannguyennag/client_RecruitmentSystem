import axios from 'axios'

export const login = (user) => async (dispatch) => {
    try {
      console.log(user)
      const {data} = await axios.post('http://localhost:8080/api/v1/auth/login', user)
      dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: 'USER_LOGIN_FAIL', payload: error.response.data.message });
    }
};


export const SignupUser = (user) => async (dispatch) => {
    try {
      const {data} = await axios.post('http://localhost:8080/api/v1/auth/register', user)
      console.log(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      dispatch({ type: 'USER_SIGNUP_SUCCESS', payload: data });
      document.location.href = '/';
    } catch (error) {
    }
};

export const SignoutUser = (user) => async (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({type: 'USER_SIGNOUT_SUCCESS', payload: {} })
  document.location.href = '/';
};

export const getAllUser = () => async (dispatch, getState) => {
  const {
    userSignin: {userInfo},
  } = getState()
  try {
    const {data} = await   axios.get('http://localhost:8080/api/v1/users/all', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0YW5AZ21haWwuY29tIiwidXNlcm5hbWUiOiJ0YW4iLCJyb2xlcyI6IlJPTEVfQURNSU4iLCJpYXQiOjE2ODgxMzMwOTMsImV4cCI6MTY4ODIxOTQ5M30.heOCk-nGqeKvnfPDUi2hg6TMsReZ7Pdk52gf-X656kU`
      },
    })
    dispatch({type: 'GET_ALL_USER', payload: data})
  } catch (error) {
    dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
  }
}

export const deleteUser = (userId) => async (dispatch, getState) => {
  const {
    userSignin: {userInfo},
  } = getState()
  try {
    const {data} = await axios.delete(`http://localhost:8080/user/delete/${userId}`)
    dispatch({type: 'DELETE_USER', payload: data})
  } catch (error) {
    dispatch({type: 'DELETE_USER_FAIL', error: error.message})
  }
}