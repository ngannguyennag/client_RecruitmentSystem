export const CompanyReducer = (state = {}, action) => {
    switch (action.type) {
        case 'COMPANY_SUCCESS':
            return {...state, userInfo: action.payload };
        case 'COMPANY_FAIL':
            return {...state, error: action.payload };
      default:
        return state;
    }
};