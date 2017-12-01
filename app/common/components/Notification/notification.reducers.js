import {
    NOTIFICATION_CLEAR,
    NOTIFICATION_DISMISS,
    NOTIFICATION_SEND
} from './notification.constants';

export default (state = [], action) => {
    switch (action.type) {
        case NOTIFICATION_SEND:
            return [action.payload, ...state.filter(({ id }) => id !== action.payload.id)];
        case NOTIFICATION_DISMISS:
            return state.filter(item => item.id !== action.payload);
        case NOTIFICATION_CLEAR:
            return [];
        default:
            return state;
    }
};
