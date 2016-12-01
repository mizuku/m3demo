import * as _ from "underscore"

import { AppState } from "../models"
import { Personal } from "../models/Personal"
import { Demo } from "../models/Demo"

import { SaveData } from "./SaveData"
import { SavePersonal } from "./SavePersonal"

const DATA_VERSION = 0.01;
const ROOT_NAME = "d";
const storage = window.localStorage;

/**
 * stateをストレージへ保存する
 * @param state state
 */
export const save = (state: AppState): void => {
    let sd: SaveData = {
        version: DATA_VERSION,
        personal: undefined
    };
    sd.personal = stateToStorageAsPersonal(state.personal);
    storage.setItem(ROOT_NAME, JSON.stringify(sd));
}

/**
 * 保存データをstateへ復元する
 * @param state AppState
 * @returns 保存データを反映済みの AppState
 */
export const restore = (state: AppState): AppState => {
    let json = storage.getItem(ROOT_NAME)
    let newState = _.extend({}, state) as AppState;
    if (json) {
        let sd: SaveData = JSON.parse(json);
        if (sd.version <= DATA_VERSION) {
            newState.personal = storageToStateAsPersonal(sd.personal);
        }
    }
    return newState;
}

/**
 * 個人別情報stateを個人別情報保存データに変換する
 * @param state 個人別情報state
 * @returns 個人別情報保存データ
 */
const stateToStorageAsPersonal = (state: Personal): SavePersonal => {
    let sp: SavePersonal = {
        favs: {}
    };
    // お気に入りの設定
    for (let key in state.favorites) {
        sp.favs[key] = state.favorites[key].map(s => {
            return {
                id: s.id,
                ci: s.circle,
                sp: s.space,
                si: s.spaceInitials,
                cm: s.comment,
                u: s.url,
                pt: s.playerType
            };
        });
    }
    return sp;
}

/**
 * 個人別情報保存データを個人別情報stateに変換する
 * @param strg 個人別情報保存データ
 * @return 個人別情報state
 */
const storageToStateAsPersonal = (strg: SavePersonal): Personal => {
    let p: Personal = {
        favorites: {}
    };
    for (let key in strg.favs) {
        p.favorites[key] = strg.favs[key].map(s => {
            return {
                id: s.id,
                circle: s.ci,
                space: s.sp,
                spaceInitials: s.si,
                comment: s.cm,
                url: s.u,
                playerType: s.pt,
                embedUrl: null,
                isTryEmbedUrl: false
            };
        });
    }
    return p;
}
