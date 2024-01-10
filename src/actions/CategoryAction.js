import axios from 'axios'

export const getHotCategory = () => async (dispatch) => {
    try {
      const {data} = await axios.get('http://localhost:8080/api/v1/categories/hot?pageNo=0&pageSize=20&sortBy=total')
      dispatch({ type: 'HOTCATEGORY_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'HOTCATEGORY_FAIL', payload: error.message });
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