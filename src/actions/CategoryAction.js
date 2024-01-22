import axios from 'axios'

export const getHotCategory = () => async (dispatch) => {
  const page = {
    pageNo : 0,
    pageSize : 20,
    sortBy : 'categoryTotal',
    sortDir: 'desc'
  }
    try {
      const {data} = await axios.post('http://localhost:8080/api/v1/categories/hot', page)
      dispatch({ type: 'HOT_CATEGORY_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'HOT_CATEGORY_FAIL', payload: error.message });
    }
};


export const getCategory = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/v1/categories/all"
    );
    const { data } = response;
    dispatch({ type: "GET_CATEGORY_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_CATEGORY_FAIL", payload: error.message });
  }
};