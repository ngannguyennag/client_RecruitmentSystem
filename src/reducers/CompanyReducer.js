export const getAllCompanyByAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_ALL_COMPANY_BY_ADMIN':
            return {...state, company: action.payload };
        case 'DELETE_COMPANY_BY_ADMIN':
            return {...state};
      default:
        return state;
    }
};
export const getCompanyTopReducer = (state = {}, action) => {
    switch (action.type) {
        case 'COMPANYTOP_SUCCESS':{
            return {...state, companyTop: action.payload}
        }
        case 'DELETE_COMPANY':{
            return {...state, error: action.payload}
        }
        default: return state
    }
};

export const getAllCompany = (state = {}, action) => {
    switch (action.type) {
        case 'GET_ALL_COMPANY_SUCCESS':{
            return {...state, companyAll: action.payload}
        }
        case 'DELETE_COMPANY':{
            return {...state}
        }
        default: return state
    }
};

export const getCompanyByNameReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_COMPANY_BY_NAME_SUCCESS': {
            return {...state, company: action.payload}
        }
        case 'DELETE_USER': {
            return state;
        }
        default:
            return state;
    }
};
export const deleteCompanyReducer = (state = {}, action) => {
    switch (action.type) {
        case 'DELETE_COMPANY_SUCCESS':{
            return {...state, companyUpdate: action.payload}
        }
        default: return state
    }
}

export const getDetailCompanyReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_DETAIL_COMPANY_SUCCESS':{
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