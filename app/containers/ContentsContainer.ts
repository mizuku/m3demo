import * as React from "react"
import * as Redux from "redux"
import { connect } from "react-redux"

import * as Const from "../constants"
import { Contents, ContentsProps } from "../components/Contents"
import { AppState } from "../models"
import { Demo } from "../models/Demo"
import * as search from "../actions/search"
import * as getEmbedUrl from "../actions/getEmbedUrl"
import * as favorite from "../actions/favorite"

const mapStateToProps = (state: AppState): ContentsProps => {
    let currentEvent = state.m3State.saleEvents[state.transition.currentEventId];
    let currentDemos = getCurrentDemos(state);
    let demoTotalCount: number = 0;
    if (currentEvent) {
        currentDemos = currentDemos.filter((v) => {
            let f = true;
            if (f) {
                // 検索文字列によるフィルタリング
                if (0 < state.transition.splitSearchText.length) {
                    f = state.transition.splitSearchText.every((vv) => {
                        return -1 < v.demo.circle.indexOf(vv);
                    });
                } else {
                    f = true;
                }
            }
            if (f && !state.transition.isFavoriteOnly) {
                // サークルスペースによるフィルタリング
                f = state.transition.excludeInitials.indexOf(v.demo.spaceInitials) < 0;
            }
            return f;
        });
        demoTotalCount = currentDemos.length;
        let start = state.transition.currentPage * state.transition.displayPerPage
        currentDemos = currentDemos.slice(start, start + state.transition.displayPerPage)
        
    }
    return {
        eventId: state.transition.currentEventId,
        currentPage: state.transition.currentPage,
        pageCount: Math.ceil(demoTotalCount / state.transition.displayPerPage),
        demos: currentDemos
    };
}

const mapDispatchToProps = (dispatch:Redux.Dispatch<AppState>): ContentsProps => {
    return {
        getEmbedUrl: (demo: Demo) => {
            dispatch(getEmbedUrl.getEmbedUrlAsync(demo));
        },
        turnToPage: (nextPage: number) => {
            dispatch(search.turnToPage(nextPage));
        },
        changeFavorite: (eventId: number, demo: Demo, isFavorite: boolean) => {
            dispatch(favorite.changeFavorite(eventId, demo, isFavorite));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Contents)

export const getCurrentDemos = (state: AppState): { demo: Demo, isFavorite: boolean }[] => {
    let se = state.m3State.saleEvents[state.transition.currentEventId];
    if (!se) {
        return [];
    }
    // demos に対応する付加情報を追加
    let favorites = state.personal.favorites[state.transition.currentEventId] || [];
    let demosWithOptions = se.demos.map((demo) => {
        let isFav = favorites.some((f) => {
            return f.circle === demo.circle
                && f.id === demo.id;
        });
        return {
            demo: demo,
            isFavorite: isFav
        };
    });
    // 抽出
    switch (state.transition.currentDemoSource) {
        case Const.Domain.CURRENT_DEMO_ALL:
            return demosWithOptions;
        case Const.Domain.CURRENT_DEMO_FAVORITE:
            return demosWithOptions.filter((d) => {
                return d.isFavorite;
            });
        default:
            return [];
    }
}