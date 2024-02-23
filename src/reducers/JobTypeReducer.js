export const getAllJobTypeReducer = (state = {}, action) => {
    switch (action.type) {
      case "GET_ALL_JOB_TYPE_SUCCESS":
        return { ...state, jobType: action.payload };
      case "GET_ALL_JOB_TYPE_FAIL":
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };

  export const saveJobTypeByAdminReducer = (state = {}, action) =>{
    switch (action.type) {
      case "SAVE_JOB_TYPE_SUCCESS":
        return { ...state, saveJobType: action.payload};
      case "SAVE_JOB_TYPE_FAIL":
        return { ...state, error: action.payload};
      default:
        return state;
    }
  }

  export const deleteJobTypeByAdminReducer = (state = {}, action) =>{
    switch (action.type) {
      case "DELETE_JOB_TYPE_SUCCESS":
        return { ...state, deleteJobType: action.payload};
      case "DELETE_JOB_TYPE_FAIL":
        return { ...state, error: action.payload};
      default:
        return state;
    }
  }

  export const getJobTypeReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_JOB_TYPE_SUCCESS':{
            return {...state, jobType: action.payload}
        }
        case 'GET_JOB_TYPE_FAIL':{
            return {...state}
        }
        default: return state
    }
  };