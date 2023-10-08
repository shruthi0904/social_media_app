import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

import App from "./App";
import './index.css';

const store = createStore(reducers, compose(applyMiddleware(thunk)))

//connect to the div with an id of root
const root = createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

    // ReactDOM.render(
    //     <Provider store={store}>
    //         <App />
    //     </Provider>,
    //     document.getElementById("root")); 