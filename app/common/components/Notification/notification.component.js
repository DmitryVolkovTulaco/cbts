import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ kind, onActionClick, id, message }) => (
    <div className={`notification alert-${kind} alert`} onClick={onActionClick.bind(this, id)}>
        <div className="notification-content">
            <span className="notification-message" dangerouslySetInnerHTML={{__html: message }} />
        </div>
    </div>
);

Notification.defaultProps = {
    kind: 'info',
};

Notification.propTypes = {
    message: PropTypes.node.isRequired,
    kind: PropTypes.oneOf([
        'success',
        'info',
        'warning',
        'danger',
    ]).isRequired,
};

export default Notification;
