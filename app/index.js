import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, IndexRoute } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import store from './store';

import App from './app';

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <HashRouter>
                    <Route path="/" component={Component}>
                    </Route>
                </HashRouter>
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    );
};

render(App);

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./app', () => {
        render(App)
    });
}