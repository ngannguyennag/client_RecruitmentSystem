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

export const getAllCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_ALL_CATEGORY_SUCCESS":
      return { ...state, category: action.payload };
    case "GET_ALL_CATEGORY_FAIL":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const saveCategoryByAdminReducer = (state = {}, action) =>{
  switch (action.type) {
    case "SAVE_CATEGORY_SUCCESS":
      return { ...state, saveCategory: action.payload};
    case "SAVE_CATEGORY_FAIL":
      return { ...state, error: action.payload};
    default:
      return state;
  }
}

export const deleteCategoryByAdminReducer = (state = {}, action) =>{
  switch (action.type) {
    case "DELETE_CATEGORY_SUCCESS":
      return { ...state, deleteCategory: action.payload};
    case "DELETE_CATEGORY_FAIL":
      return { ...state, error: action.payload};
    default:
      return state;
  }
}