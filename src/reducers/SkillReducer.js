export const getAllSkillReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_ALL_SKILL_SUCCESS":
            return { ...state, skill: action.payload };
        case "GET_ALL_SKILL_FAIL":
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export const saveSkillByAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case "SAVE_SKILL_SUCCESS":
            return { ...state, saveSkill: action.payload };
        case "SAVE_SKILL_FAIL":
            return { ...state, error: action.payload };
        default:
            return state;
    }
}

export const addSkillByAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case "ADD_SKILL_SUCCESS":
            return { ...state, addSkill: action.payload };
        case "ADD_SKILL_FAIL":
            return { ...state, error: action.payload };
        default:
            return state;
    }
}

export const deleteSkillByAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case "DELETE_SKILL_SUCCESS":
            return { ...state, deleteSkill: action.payload };
        case "DELETE_SKILL_FAIL":
            return { ...state, error: action.payload };
        default:
            return state;
    }
}
export const pageSkillByAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case "PAGE_SKILL_SUCCESS":
            return { ...state, pageSkill: action.payload };
        case "PAGE_SKILL_FAIL":
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export const getSkillReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_SKILL_SUCCESS':{
            return {...state, skill: action.payload}
        }
        case 'GET_SKILL_FAIL':{
            return {...state}
        }
        default: return state
    }
  };