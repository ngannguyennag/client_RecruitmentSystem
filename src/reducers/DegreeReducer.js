export const getAllDegreeReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_ALL_DEGREE_SUCCESS":
            return { ...state, degree: action.payload };
        case "GET_ALL_DEGREE_FAIL":
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export const saveDegreeByAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case "SAVE_DEGREE_SUCCESS":
            return { ...state, saveDegree: action.payload };
        case "SAVE_DEGREE_FAIL":
            return { ...state, error: action.payload };
        default:
            return state;
    }
}

export const addDegreeByAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case "ADD_DEGREE_SUCCESS":
            return { ...state, addDegree: action.payload };
        case "ADD_DEGREE_FAIL":
            return { ...state, error: action.payload };
        default:
            return state;
    }
}

export const deleteDegreeByAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case "DELETE_DEGREE_SUCCESS":
            return { ...state, deleteDegree: action.payload };
        case "DELETE_DEGREE_FAIL":
            return { ...state, error: action.payload };
        default:
            return state;
    }
}
export const pageDegreeByAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case "PAGE_DEGREE_SUCCESS":
            return { ...state, pageDegree: action.payload };
        case "PAGE_DEGREE_FAIL":
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export const getDegreeReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_DEGREE_SUCCESS':{
            return {...state, degree: action.payload}
        }
        case 'GET_DEGREE_FAIL':{
            return {...state}
        }
        default: return state
    }
  };