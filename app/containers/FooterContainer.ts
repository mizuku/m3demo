import * as React from "react"
import * as Redux from "redux"
import { connect } from "react-redux"

import { Footer, FooterProps } from "../components/Footer"
import { AppState } from "../models"

const mapStateToProps = (state: AppState): FooterProps => {
    return {
    };
}

const mapDispatchToProps = (dispatch: Redux.Dispatch<AppState>): FooterProps => {
    return {
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Footer)
