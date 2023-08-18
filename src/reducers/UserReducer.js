
export const UserSigninReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_LOGIN_SUCCESS':
            return {...state, userInfo: action.payload };
        case 'USER_LOGIN_FAIL':
            return {...state, error: action.payload };
      default:
        return state;
    }
};

export const UserSignupReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_SIGNUP_SUCCESS':
            return {...state, userInfo: action.payload };
        default:
            return state;
    }
};

export const UserSignoutReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_SIGNOUT_SUCCESS':
            return {...state};
        default:
            return state;
    }
};

export const getAllUserReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_ALL_USER':{
            return {...state, user: action.payload}
        }

        case 'DELETE_USER':{
            return {...state}
        }

        default: return state
    }
}

export const getAccountInfoReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_ACCOUNT_INFO':{
            return {...state, user: action.payload}
        }

        case 'DELETE_USER':{
            return {...state}
        }

        default: return state
    }
}

export const getAccountUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_ACCOUNT_UPDATE':{
            return {...state, userUpdate: action.payload}
        }

        case 'DELETE_USER':{
            return {...state}
        }

        default: return state
    }
}

export const deleteUserReducer = (state = {}, action) => {
    switch (action.type) {
        case 'DELETE_USER_SUCCESS':{
            return {...state, userUpdate: action.payload}
        }
            
        default: return state
    }
}