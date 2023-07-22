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


export const getAccountInfo = (token) => async (dispatch, getState) => {
  const {
    userSignin: {userInfo},
  } = getState()
  try {
    const {data} = await   axios.get('http://localhost:8080/api/v1/users/getAccountInfo?token='+ token
    // {
      // headers: {
      //   'Content-Type': 'application/json',
      //   'Authorization': `Bearer ${token}`
      // },
    // }
    )
    dispatch({type: 'GET_ACCOUNT_INFO', payload: data})
  } catch (error) {
    dispatch({type: 'GET_ACCOUNT_INFO_FAIL', payload: error.message})
  }
}
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

export const getAccountUpdate = (token, user) => async (dispatch) => {
  try {
    const {data} = await   axios.put('http://localhost:8080/api/v1/users/update?token='+ token, user)
    console.log(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch({ type: 'USER_UPDATE_SUCCESS', payload: data });
    // document.location.href = '/userfile';
  } catch (error) {
  }
};

export const SignoutUser = (user) => async (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({type: 'USER_SIGNOUT_SUCCESS', payload: {} })
  document.location.href = '/';
};

export const getAllUser = (token) => async (dispatch, getState) => {
  const {
    userSignin: {userInfo},
  } = getState()
  try {
    // console.log(localStorage.getItem('userInfo'));
    const {data} = await   axios.get('http://localhost:8080/api/v1/users/all', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
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