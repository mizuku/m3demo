import * as _ from "underscore"

import * as Const from "../constants"
import { ApiSaleEvent } from "../models/Api/ApiSaleEvent"
import { Transition } from "../models/Transition"

let initialState:Transition = {
    pageType: Const.Domain.PAGE_TYPE_DEMOLIST,
    currentDemoSource: Const.Domain.CURRENT_DEMO_ALL,
    displayPerPage: 4,
    searchText: "",
    splitSearchText: [],
    currentEventId: 0,
    excludeInitials: [],
    isFavoriteOnly: false,
    currentPage: 0
};

/**
 * Transition のReducer
 */
export const transition = (state:Transition = initialState, action:any): Transition => {
    switch (action.type) {
        case Const.Action.Type.FetchEventSuccess:
        /* アプリケーション即売会情報Fetch成功 */
        {
            let newState = _.extend({}, state) as Transition;
            let events = action.res as ApiSaleEvent[];
            if (Array.isArray(events)) {
                newState.currentEventId = events
                    .map((ev) => {
                        return ev.id;
                    })
                    .reduce((c, p) => {
                        return c < p ? p : c;
                    });
            }
            return newState;
        }
        case Const.Action.Type.FetchEventError:
        /* アプリケーション即売会情報Fetch失敗 */
        {
            let newState = _.extend({}, state) as Transition;
            newState.currentEventId = 0;
            return newState;
        }
        case Const.Action.Type.FetchDemosSuccess:
        /* 音源情報Fetch成功 */
        {
            let newState = _.extend({}, state) as Transition;
            newState.currentEventId = action.eventId as number;
            newState.excludeInitials = [];
            newState.currentPage = 0;
            return newState;
        }
        case Const.Action.Type.FetchDemosError:
        /* 音源情報Fetch失敗 */
        {
            let newState = _.extend({}, state) as Transition;
            newState.currentEventId = action.eventId as number;
            newState.excludeInitials = [];
            newState.currentPage = 0;
            return newState;
        }
        case Const.Action.Type.SearchTextChanged:
        /* 視聴音源検索文字列変更 */
        {
            let newState = _.extend({}, state) as Transition;
            newState.searchText = action.searchText;
            return newState;
        }
        case Const.Action.Type.NarrowingSearchDemo:
        /* 試聴音源の絞込検索 */
        {
            let newState = _.extend({}, state) as Transition;
            if (state.searchText) {
                // 行頭・行末スペース除去
                let t = state.searchText.replace(/^(\s|　)+|(\s+|　)+$/g, "");

                newState.splitSearchText = t.split(/\s|　/).filter(v => {
                    return 0 < v.length;
                });
            } else {
                newState.splitSearchText = [];
            }
            newState.currentPage = 0;

            return newState;
        }
        case Const.Action.Type.ChangeDisplayPerPage:
        /* 1ページに表示する数の変更 */
        {
            let newState = _.extend({}, state) as Transition;
            newState.displayPerPage = action.num;
            // 同じ音源を表示できるようにページ遷移
            newState.currentPage = Math.floor((state.currentPage * state.displayPerPage)
                 / newState.displayPerPage);
            return newState;
        }
        case Const.Action.Type.ChangeExcludeInitials:
        /* 除外するサークルスペース頭文字の変更 */
        {
            let newState = _.extend({}, state) as Transition;
            let i = newState.excludeInitials.indexOf(action.initials);
            if (action.isChecked) {
                if (-1 < i) {
                    newState.excludeInitials.splice(i, 1);
                    // excludeInitialsインスタンスを新しくする
                    newState.excludeInitials = [].concat(newState.excludeInitials);
                }
            } else {
                if (i < 0) {
                    // excludeInitialsインスタンスを新しくする
                    newState.excludeInitials = newState.excludeInitials.concat(action.initials);
                }
            }
            newState.currentPage = 0;
            return newState;
        }
        case Const.Action.Type.ChangeAllInitials:
        /* サークルスペースの有効/除外を変更する */
        {
            let newState = _.extend({}, state) as Transition;
            let initials = action.initials as string[];
            let isChecked = action.isChecked as boolean;
            if (isChecked) {
                // すべて有効
                newState.excludeInitials = [];
            } else {
                // すべて除外
                newState.excludeInitials = [].concat(initials);
            }
            newState.currentPage = 0;
            return newState;
        }
        case Const.Action.Type.TurnToPage:
        /* ページを変更する */
        {
            let newState = _.extend({}, state) as Transition;
            newState.currentPage = action.nextPage;
            return newState;
        }
        case Const.Action.Type.SearchAll:
        /* すべてから探す */
        {
            let newState = _.extend({}, state) as Transition;
            newState.isFavoriteOnly = false;
            newState.currentDemoSource = Const.Domain.CURRENT_DEMO_ALL;
            newState.currentPage = 0;
            return newState;
        }
        case Const.Action.Type.SearchFavorite:
        /* お気に入りから探す */
        {
            let newState = _.extend({}, state) as Transition;
            newState.isFavoriteOnly = true;
            newState.currentDemoSource = Const.Domain.CURRENT_DEMO_FAVORITE;
            newState.currentPage = 0;
            return newState;
        }
        default:
        {
            return state;
        }
    }
}

export default transition