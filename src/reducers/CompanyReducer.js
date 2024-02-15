export const getAllCompanyByAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_ALL_COMPANY_BY_ADMIN_SUCCESS':
            return {...state, company: action.payload };
        case 'DELETE_COMPANY_BY_ADMIN':
            return {...state};
      default:
        return state;
    }
};
export const getCompanyTopReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_COMPANY_TOP_SUCCESS':{
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
export const getCompanyByIdReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_COMPANY_BY_ID_SUCCESS': {
            return {...state, company: action.payload}
        }
        case 'GET_COMPANY_BY_ID_FAIL': {
            return {...state, error: action.payload}
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

export const updateCompanyBasicInfoReducer = (state={}, action) => {
    switch (action.type) {
        case "COMPANY_UPDATE_BASIC_INFO_SUCCESS":{
            return {...state, basicInfo: action.payload}
        }  
        case "COMPANY_UPDATE_BASIC_INFO_FAIL":{
            return {...state, error: action.payload}
        }   
        default: return state
    }
}

export const updateCompanyDescReducer = (state={}, action) => {
    switch (action.type) {
        case "COMPANY_UPDATE_DESC_SUCCESS":{
            return {...state, desc: action.payload}
        }  
        case "COMPANY_UPDATE_DESC_FAIL":{
            return {...state, error: action.payload}
        }   
        default: return state
    }
}

export const updateCompanyMediaReducer = (state={}, action) => {
    switch (action.type) {
        case "COMPANY_UPDATE_MEDIA_SUCCESS":{
            return {...state, media: action.payload}
        }  
        case "COMPANY_UPDATE_MEDIA_FAIL":{
            return {...state, error: action.payload}
        }   
        default: return state
    }
}

export const updateCompanyAddressReducer = (state={}, action) => {
    switch (action.type) {
        case "COMPANY_UPDATE_ADDRESS_SUCCESS":{
            return {...state, address: action.payload}
        }  
        case "COMPANY_UPDATE_ADDRESS_FAIL":{
            return {...state, error: action.payload}
        }   
        default: return state
    }
}

export const uploadCompanyImageReducer = (state={}, action) => {
    switch (action.type) {
        case "COMPANY_UPLOAD_IMAGE_SUCCESS":{
            return {...state, logo: action.payload}
        }  
        case "COMPANY_UPLOAD_IMAGE_FAIL":{
            return {...state, error: action.payload}
        }   
        default: return state
    }
}