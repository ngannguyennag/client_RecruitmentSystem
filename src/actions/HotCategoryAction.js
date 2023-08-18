import axios from 'axios'

export const getHotCategory = () => async (dispatch) => {
    try {
      const {data} = await axios.get('http://localhost:8080/api/v1/categories/hot?pageNo=0&pageSize=20&sortBy=total')
      dispatch({ type: 'HOTCATEGORY_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'HOTCATEGORY_FAIL', payload: error.response.data.message });
    }
};