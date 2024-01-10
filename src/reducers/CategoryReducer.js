export const getHotCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case "HOT_CATEGORY_SUCCESS":
      return { ...state, hotCategory: action.payload };
    case "HOT_CATEGORY_FAIL":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const getCategoryReducer = (state = {}, action) => {
  switch (action.type) {
      case 'GET_CATEGORY_SUCCESS':{
          return {...state, category: action.payload}
      }
      case 'GET_CATEGORY_FAIL':{
          return {...state}
      }
      default: return state
  }
};
