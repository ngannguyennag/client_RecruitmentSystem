export const getStatisticalByAdminReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_STATISTICAL_BY_ADMIN_SUCCESS': {
            return {...state, statisticalByAdmin: action.payload}
        }
        case 'GET_STATISTICAL_BY_ADMIN_FAIL': {
            return {...state, error: action.payload}
        }
        default:
            return state;
    }
};

export const getStatisticalByCompanyReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_STATISTICAL_BY_COMPANY_SUCCESS': {
            return {...state, statisticalByCompany: action.payload}
        }
        case 'GET_STATISTICAL_BY_COMPANY_FAIL': {
            return {...state, error: action.payload}
        }
        default:
            return state;
    }
};