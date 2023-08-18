import axios from 'axios';

export const login = (user) => async (dispatch) => {
    try {
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
    const {data} = await   axios.get('http://localhost:8080/api/v1/user/getAccountInfo?token='+ token
    )
    dispatch({type: 'GET_ACCOUNT_INFO', payload: data})
  } catch (error) {
    dispatch({type: 'GET_ACCOUNT_INFO_FAIL', payload: error.message})
  }
}
export const SignupUser = (user) => async (dispatch) => {
    try {
      const {data} = await axios.post('http://localhost:8080/api/v1/auth/register', user)
      localStorage.setItem('userInfo', JSON.stringify(data));
      dispatch({ type: 'USER_SIGNUP_SUCCESS', payload: data });
      document.location.href = '/';
    } catch (error) {
    }
};

export const getAccountUpdate = (token, user) => async (dispatch) => {
  try {
    const {data} = await   axios.put('http://localhost:8080/api/v1/user/update?token='+ token, user)
    localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch({ type: 'USER_UPDATE_SUCCESS', payload: data });
  } catch (error) {
  }
};

export const changePassword = (token, managePassword) => async(dispatch) =>{
  try{
    const {data} = await axios.put('http://localhost:8080/api/v1/user/changePassword?token=' + token, managePassword)
    localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch({type: 'USER_UPDATEPASSWORD_SUCCESS', payload: data});
  } catch(error){
    dispatch({type: 'USER_UPDATEPASSWORD_FAIL', payload: error.message})
  }
}
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
    const {data} = await axios.get('http://localhost:8080/api/v1/manage_users/all', {
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

export const deleteUser = (userId, token) => async (dispatch, getState) => {
  const {
    userSignin: {userInfo},
  } = getState()
  try {
    const {data} = await axios.delete('http://localhost:8080/api/v1/manage_users/delete/'+ userId,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    dispatch({type: 'DELETE_USER_SUCCESS', payload: data})
  } catch (error) {
    dispatch({type: 'DELETE_USER_FAIL', payload: error.message})
  }
}