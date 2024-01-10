export const applyJobReducer = (state = {}, action) => {
    switch (action.type) {
        case 'APPLY_SUCCESS':{
            return {...state, apply: action.payload}
        }
        case 'APPLY_FAIL':{
            return {...state, error: action.payload}
        }
        default: return state
    }
  };