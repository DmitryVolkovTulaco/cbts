import {
    NOTIFICATION_CLEAR,
    NOTIFICATION_DISMISS,
    NOTIFICATION_SEND
} from './notification.constants';

export default {
    sendNotification(params) {
        let payload = { ...params, id: new Date().getTime(), dismissAfter: params.dismissAfter ? params.dismissAfter : 5000 };

        return dispatch => {
            dispatch({ type: NOTIFICATION_SEND, payload });

            if (payload.dismissAfter) {
                setTimeout(() => {
                    dispatch({
                        type: NOTIFICATION_DISMISS,
                        payload: payload.id,
                    });
                }, payload.dismissAfter);
            }
        };
    },

    dismissNotification(id) {
        return {
            type: NOTIFICATION_DISMISS,
            payload: id
        };
    },

    dismissNotifications() {
        return {
            type: NOTIFICATION_CLEAR
        };
    }
}
