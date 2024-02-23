import axios from 'axios'

export const getHotCategory = () => async (dispatch) => {
  const page = {
    pageNo : 0,
    pageSize : 20,
    sortBy : 'total',
    sortDir: 'desc'
  }
    try {
      const {data} = await axios.post('http://localhost:8080/api/v1/category/hot', page)
      dispatch({ type: 'HOT_CATEGORY_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'HOT_CATEGORY_FAIL', payload: error.message });
    }
};


export const getCategory = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/v1/category/all"
    );
    const { data } = response;
    dispatch({ type: "GET_CATEGORY_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_CATEGORY_FAIL", payload: error.message });
  }
};
export const getAllCategoryByAdmin = (page) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "http://localhost:8080/api/v1/category/get-all", page
    );
    dispatch({ type: "GET_ALL_CATEGORY_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_ALL_CATEGORY_FAIL", payload: error.message });
  }
};

export const saveCategoryByAdmin = (page, token) => async(dispatch) =>{
  try{
    const {data} = await axios.post(
      "http://localhost:8080/api/v1/category/save", page,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "SAVE_CATEGORY_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "SAVE_CATEGORY_FAIL", payload: error.message });
  }
};

export const deleteCategoryByAdmin = (page, token) => async(dispatch) =>{
  try{
    const {data} = await axios.post(
      "http://localhost:8080/api/v1/category/delete", page,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
      );
      dispatch({ type: "DELETE_CATEGORY_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "DELETE_CATEGORY_FAIL", payload: error.message });
    }
  };