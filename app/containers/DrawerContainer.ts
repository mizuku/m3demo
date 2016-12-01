import * as React from "react"
import * as Redux from "redux"
import { connect } from "react-redux"

import { Drawer, DrawerProps } from "../components/Drawer"
import { AppState } from "../models"
import * as fetchDemos from "../actions/fetchDemos"
import * as search from "../actions/search"

const mapStateToProps = (state: AppState): DrawerProps => {
    let currentEvent = state.m3State.saleEvents[state.transition.currentEventId];
    let excludes = state.transition.excludeInitials || [];
    return {
        events: state.m3State.events,
        spaceInitials: currentEvent ? currentEvent.spaceInitials : [],
        currentEventId: state.transition.currentEventId,
        excludeInitials: state.transition.excludeInitials,
        isFavoriteOnly: state.transition.isFavoriteOnly,
        isAllSpaceSelected: 0 == excludes.length
    };
}

const mapDispatchToProps = (dispatch:Redux.Dispatch<AppState>): DrawerProps => {
    return {
        changeExcludeInitials: (initials: string, isChecked: boolean) => {
            dispatch(search.changeExcludeInitials(initials, isChecked));
        },
        changeAllInitials: (initials: string[], isChecked: boolean) => {
            dispatch(search.changeAllInitials(initials, isChecked));
        },
        changeEvent: (eventId: number) => {
            dispatch(fetchDemos.fetchDemosAsync(eventId));
        },
        changeFavoriteOnly: (isFavoriteOnly: boolean) => {
            dispatch(search.changeFavoriteOnly(isFavoriteOnly));
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Drawer)
