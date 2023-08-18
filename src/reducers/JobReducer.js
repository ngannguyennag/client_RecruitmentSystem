
export const getAllJobReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_ALL_JOB':{
            return {...state, job: action.payload}
        }

        case 'DELETE_JOB':{
            return {...state}
        }

        default: return state
    }
};

export const getJobTopReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_JOBTOP_SUCCESS':
            return {...state, jobTop: action.payload };
        case 'GET_JOBTOP_FAIL':
            return {...state, error: action.payload };
      default:
        return state;
    }
  };