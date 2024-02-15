export const getNotificationReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_NOTIFICATION_SUCCESS': {
            return {...state, notifications: action.payload}
        }
        case 'GET_NOTIFICATION_FAIL': {
            return {...state, error: action.payload}
        }
        default:
            return state;
    }
};