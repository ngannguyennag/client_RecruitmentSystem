import axios from "axios";

export const getNotification = (accountId, page) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `http://localhost:8080/api/v1/notifications/${accountId}/page`,page
    );
    dispatch({ type: "GET_NOTIFICATION_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_NOTIFICATION_FAIL", payload: error.message });
  }
};