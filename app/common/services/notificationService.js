import store from '../../store';
import notification from '../components/Notification/notification.actions';

export default (params) => {
    store.dispatch(notification.sendNotification(params))
}
