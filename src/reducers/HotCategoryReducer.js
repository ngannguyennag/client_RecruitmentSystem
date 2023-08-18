export const getHotCategoryReducer = (state = {}, action) => {
    switch (action.type) {
      case 'HOTCATEGORY_SUCCESS':
        return { ...state, hotCategory: action.payload };
      case 'HOTCATEGORY_FAIL':
        return {...state, error: action.payload };
      default:
        return state;
    }
  }
