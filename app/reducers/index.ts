import { combineReducers } from "redux"

import * as Const from "../constants"
import { AppState } from "../models"
import { save, restore } from "../provider/storageProvider"

import { m3State } from "./m3State"
import { transition } from "./transition"
import { personal } from "./personal"

export default function (state: AppState = {}, action: any) {
    let newState: AppState = {
        m3State: m3State(state.m3State, action),
        transition: transition(state.transition, action),
        personal: personal(state.personal, action)
    };
    switch (action.type) {
        case Const.Action.Type.AppLoad:
        /* アプリケーション起動 */
        {
            // ストレージから状態復元
            newState = restore(newState);
            break;
        }
        case Const.Action.Type.ChangeFavorite:
        /* お気に入りを変更する */
        {
            // ストレージへ状態保存
            save(newState);
            break;
        }
        case Const.Action.Type.GetSoundCloudTokenSuccess:
        /* SoundCloud API用Token取得成功 */
        {
            let hash = action.res;
            if (hash) {
                let ascii = atob(hash);
                let n = `${35 * 337}`.split("").reduce((c, p) => {
                    return String.fromCharCode(c.charCodeAt(0) ^ p.charCodeAt(0));
                }).charCodeAt(0);
                let pos = Math.round(n / 10) + Math.round(n % 10);
                let token = ascii.substr(pos, 32).split("").reverse().join("");
                (Window as any).prototype.__getToken = () => {
                    return token;
                };
            }
            break;
        }
        case Const.Action.Type.GetSoundCloudTokenError:
        /* SoundCloud API用Token取得失敗 */
        {
            break;
        }
        default:
            break;
    }
    return newState;
}
