export const getAllIndustryReducer = (state = {}, action) => {
    switch (action.type) {
      case "GET_ALL_INDUSTRY_SUCCESS":
        return { ...state, industry: action.payload };
      case "GET_ALL_INDUSTRY_FAIL":
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };

  export const saveIndustryByAdminReducer = (state = {}, action) =>{
    switch (action.type) {
      case "SAVE_INDUSTRY_SUCCESS":
        return { ...state, saveIndustry: action.payload};
      case "SAVE_INDUSTRY_FAIL":
        return { ...state, error: action.payload};
      default:
        return state;
    }
  }

  export const deleteIndustryByAdminReducer = (state = {}, action) =>{
    switch (action.type) {
      case "DELETE_INDUSTRY_SUCCESS":
        return { ...state, deleteIndustry: action.payload};
      case "DELETE_INDUSTRY_FAIL":
        return { ...state, error: action.payload};
      default:
        return state;
    }
  }

  export const getIndustryReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_INDUSTRY_SUCCESS':{
            return {...state, industry: action.payload}
        }
        case 'GET_INDUSTRY_FAIL':{
            return {...state}
        }
        default: return state
    }
  };
