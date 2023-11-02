export const getCompanyReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GETCOMPANY_SUCCESS':
            return {...state, company: action.payload };
        case 'GETCOMPANY_FAIL':
            return {...state, error: action.payload };
      default:
        return state;
    }
};
export const getAllCompanyReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_ALL_COMPANY':{
            return {...state, company: action.payload}
        }
        case 'DELETE_COMPANY':{
            return {...state}
        }
        default: return state
    }
};

export const getDetailCompanyReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_DETAIL_COMPANY':{
            return {...state, company: action.payload}
        }
        case 'DELETE_COMPANY':{
            return {...state}
        }
        default: return state
    }
};