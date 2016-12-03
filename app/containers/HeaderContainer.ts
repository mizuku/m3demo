import * as React from "react"
import * as Redux from "redux"
import { connect } from "react-redux"

import { Header, HeaderProps } from "../components/Header"
import { AppState } from "../models"
import * as search from "../actions/search"

const mapStateToProps = (state: AppState): HeaderProps => {
    return {
        searchText: state.transition.searchText,
        displayPerPage: state.transition.displayPerPage
    };
}

const mapDispatchToProps = (dispatch:Redux.Dispatch<AppState>): HeaderProps => {
    return {
        searchTextChanged: (searchText: string) => {
            dispatch(search.searchTextChanged(searchText));
        },
        search: (searchText: string) => {
            dispatch(search.searchDemo(searchText));
        },
        displayPerPageChanged: (num: number) => {
            dispatch(search.changeDisplayPerPage(num));
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)
