import React from 'react';
import { connect } from 'react-redux';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import PropTypes from 'prop-types';

import Notification from './notification.component';
import notificationActions from './notification.actions';

import './notification.scss';

const NotificationsContainer = (props) => {
    const {
        notifications,
        transitionEnterTimeout,
        transitionLeaveTimeout,
        dismissNotification
    } = props;

    return (
        <div className="notification-container">
            <CSSTransitionGroup
                transitionName="notification-transition"
                transitionEnterTimeout={transitionEnterTimeout}
                transitionLeaveTimeout={transitionLeaveTimeout}
            >
                {notifications.map(notification =>
                    <Notification
                        key={notification.id}
                        id={notification.id}
                        message={notification.message}
                        kind={notification.kind}
                        onActionClick={dismissNotification}
                    />)}
            </CSSTransitionGroup>
        </div>
    );
};

NotificationsContainer.defaultProps = {
    transitionEnterTimeout: 600,
    transitionLeaveTimeout: 600,
};

NotificationsContainer.propTypes = {
    notifications: PropTypes.array.isRequired,
    transitionEnterTimeout: PropTypes.number,
    transitionLeaveTimeout: PropTypes.number,
    dismissNotification: PropTypes.func
};

const mapStateToProps = (state) => ({
    notifications: state.common.notifications
});

const mapDispatchToProps = (dispatch) => ({
    dismissNotification: (id) => dispatch(notificationActions.dismissNotification(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsContainer);
