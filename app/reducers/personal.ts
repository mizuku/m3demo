import * as _ from "underscore"

import { Personal } from "../models/Personal"
import { Demo } from "../models/Demo"
import * as Const from "../constants"

let initialState:Personal = {
    favorites: {}
};

/**
 * Personal の reducer
 */
export const personal = (state: Personal = initialState, action: any): Personal => {
    switch (action.type) {
        case Const.Action.Type.ChangeFavorite:
        // お気に入り変更
        {
            let newState = _.extend({}, state) as Personal;
            let saveDemo = _.extend({}, action.demo) as Demo;
            if (saveDemo) {
                let isSave = action.isFavorite;
                // 埋め込みプレイヤーは再取得する
                saveDemo.isTryEmbedUrl = false;
                saveDemo.embedUrl = null;

                let favorites = newState.favorites[action.eventId];
                if (favorites) {
                    let d = favorites.filter((v) => {
                        return v.id === saveDemo.id
                            && v.circle === saveDemo.circle;
                    })[0];
                    let i = favorites.indexOf(d);
                    if (-1 < i) {
                        if (isSave) {
                            favorites[i] = saveDemo;
                        } else {
                            favorites.splice(i, 1);
                        }
                    } else {
                        favorites.push(saveDemo);
                    }
                    // スペース, IDの昇順でソート
                    newState.favorites[action.eventId] = favorites.sort((a, b) => {
                        let c0 = a.space.localeCompare(b.space);
                        return c0 == 0 ? a.id.localeCompare(b.id) : c0;
                    });
                } else {
                    newState.favorites[action.eventId] = [saveDemo];
                }
            }
            return newState;
        }
        default:
        {
            return state;
        }
    }
}