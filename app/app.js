import React from 'react';

import NotificationContainer from './common/components/Notification/notification.container';
import Home from './home/components/home.page';

export default ({ openCreatePage, closeCreatePage, children }) => (
    <div>
        <NotificationContainer />
        <Home/>
    </div>
);
