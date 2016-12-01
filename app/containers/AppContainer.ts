import * as React from "react"
import * as Redux from "redux"
import { connect } from "react-redux"

import { App, AppProps} from "../components/App"

import { AppState } from "../models"
import * as app from "../actions/app"

const mapStateToProps = (state: AppState): AppProps => {
    return {};
}

const mapDispatchToProps = (dispatch:Redux.Dispatch<AppState>): AppProps => {
    return {
        onAppLoad: () => {
            dispatch(app.onAppLoad());
        },
        getStartup: () => {
            dispatch(app.getStartupAsync());
        },
        getToken: () => {
            dispatch(app.getTokenAsync());
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
