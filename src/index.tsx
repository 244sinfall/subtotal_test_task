import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './app';
import { Provider } from 'react-redux';
import store from './model/store';

const rootElement = document.querySelector('#root');

const root = createRoot(rootElement);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
