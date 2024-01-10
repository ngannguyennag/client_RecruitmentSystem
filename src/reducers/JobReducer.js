export const getAllJobByAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_ALL_JOB_BY_ADMIN_SUCCESS':{
            return {...state, job: action.payload}
        }
        case 'DELETE_JOB_BY_ADMIN':{
            return {...state}
        }
        default: return state
    }
};

export const getJobTopReducer = (state = {}, action) => {
    switch (action.type) {
        case 'JOBTOP_SUCCESS':
            return {...state, jobTop: action.payload };
        case 'JOBTOP_FAIL':
            return {...state, error: action.payload };
      default:
        return state;
    }
  };

  export const getAllJobByCompanyReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_ALL_JOB_BY_COMPANY_SUCCESS':{
            return {...state, jobCompany: action.payload}
        }
        case 'DELETE_JOB':{
            return {...state}
        }
        default: return state
    }
};

export const getAllJob = (state = {}, action) => {
    switch (action.type) {
        case 'GET_ALL_JOB_SUCCESS':{
            return {...state, jobAll: action.payload}
        }
        case 'DELETE_JOB':{
            return {...state}
        }
        default: return state
    }
};

export const getJobByNameReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_JOB_BY_NAME_SUCCESS': {
            return {...state, job: action.payload}
        }
        case 'DELETE_USER': {
            return state;
        }
        default:
            return state;
    }
};

export const getJobByIdReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_JOB_BY_ID_SUCCESS': {
            return {...state, job: action.payload}
        }
        case 'GET_JOB_BY_ID_FAIL': {
            return {...state, error: action.payload}
        }
        default:
            return state;
    }
};

export const deleteJobReducer = (state = {}, action) => {
    switch (action.type) {
        case 'DELETE_JOB_SUCCESS':{
            return {...state, jobUpdate: action.payload}
        }    
        default: return state
    }
}
export const createWorkReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CREATE_WORK_SUCCESS':
            return {...state, createWork: action.payload };
        default:
            return state;
    }
};