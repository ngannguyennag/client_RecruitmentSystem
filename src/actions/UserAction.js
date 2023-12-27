import axios from 'axios';

export const login = (user) => async (dispatch) => {
    try {
      const {data} = await axios.post('http://localhost:8080/api/v1/auth/login', user)
      dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: 'USER_LOGIN_FAIL', payload: error.message });
    }
};


export const getAccountInfo = (token) => async (dispatch, getState) => {
  const {
    userSignin: {userInfo},
  } = getState()
  try {
    const {data} = await   axios.get('http://localhost:8080/api/v1/user/get-info-no-token', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    }
    )
    dispatch({type: 'GET_ACCOUNT_INFO_SUCCESS', payload: data})
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
  console.log(user);
  try {
    const {data} = await   axios.put('http://localhost:8080/api/v1/user/update-no-token',user,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    localStorage.removeItem('userInfo');
    localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch({ type: 'USER_UPDATE_SUCCESS', payload: data });
  } catch (error) {
  }
};

export const uploadImage = (token,imageData) => async dispatch => {
  if (imageData.entries().next().value[1] !== null) {
      const response = await axios.post('http://localhost:8080/api/v1/user/image/upload-no-token', imageData, 
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
      );
      dispatch({
          type: "UPLOAD_IMAGE",
          payload: response.data
      });
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
  try{
    // await axios.get('http://localhost:8080/api/v1/auth/logout')
  localStorage.removeItem('userInfo')
  dispatch({type: 'USER_SIGNOUT_SUCCESS', payload: {} })
  document.location.href = '/';
  }
  catch(error){
    dispatch({type: 'USER_SIGNOUT_FAIL', payload: error.message})
  }
  
};

export const getAllUser = (token) => async (dispatch, getState) => {
  const {
    userSignin: {userInfo},
  } = getState()
  try {
    const {data} = await axios.get('http://localhost:8080/api/v1/admin/manage/users/all', {
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
    const {data} = await axios.delete('http://localhost:8080/api/v1/admin/manage/users/delete/'+ userId,{
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

export const getUserByName = (name, token) => async (dispatch, getState) =>{
  const {
    userSignin: {userInfo},
  } = getState()
  try {
    const {data} = await axios.get('http://localhost:8080/api/v1/admin/manage/users/find?name=' +name,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    dispatch({type: 'GET_USER_BY_NAME_SUCCESS', payload: data})
  } catch(error){
    dispatch({type:'GET_USER_BY_NAME_FAIL', payload: error.message})
  }
}