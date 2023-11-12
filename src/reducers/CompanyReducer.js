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

export const getProvinceReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_PROVINCE':{
            return {...state, province: action.payload}
        }
        case 'DELETE_PROVINCE':{
            return {...state}
        }
        default: return state
    }
};

export const getDistrictReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_DISTRICT':{
            return {...state, district: action.payload}
        }
        case 'DELETE_DISTRICT':{
            return {...state}
        }
        default: return state
    }
};

export const getWardsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_WARDS':{
            return {...state, wards: action.payload}
        }
        case 'DELETE_WARDS':{
            return {...state}
        }
        default: return state
    }
};

export const getIndustryReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_INDUSTRY':{
            return {...state, industry: action.payload}
        }
        case 'DELETE_INDUSTRY':{
            return {...state}
        }
        default: return state
    }
};