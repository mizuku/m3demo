import * as React from "react"
import * as ReactDOM from "react-dom"
import { applyMiddleware, createStore } from "redux"
import { Provider } from "react-redux"
import * as _ from "underscore"

import thunk from "redux-thunk"

import AppContainer from "./containers/AppContainer"
import reducer from "./reducers"

let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const store = createStoreWithMiddleware(reducer);

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById("app-root")
);

