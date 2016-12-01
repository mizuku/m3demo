import * as superagent from "superagent"

import * as Const from "../constants"
import { callApi } from "./Action"

/**
 * 起動処理
 * @returns Action
 */
export const onAppLoad = (): any => {
    return {
        type: Const.Action.Type.AppLoad
    };
}

/**
 * 即売会一覧取得開始
 * @returns Action
 */
export const startFetchEvent = (): any => {
    return {
        type: Const.Action.Type.FetchEventStart
    };
}

/**
 * 即売会一覧取得成功
 * @returns Action
 */
export const successFetchEvent = (response: superagent.Response): any => {
    return {
        type: Const.Action.Type.FetchEventSuccess,
        res: response.body
    };
}

/**
 * 即売会一覧取得失敗
 * @returns Action
 */
export const errorFetchEvent = (response: superagent.Response): any => {
    return {
        type: Const.Action.Type.FetchEventError,
        res: response.body
    };
}

/**
 * アプリケーション起動情報を非同期に取得する
 * @returns Action
 */
export const getStartupAsync = (): any => {
    return (dispatcher: Function) => {

        // イベント一覧
        dispatcher(startFetchEvent);
        callApi(Const.Service.APP_EVENTS, "get")
            .then((res) => {
                dispatcher(successFetchEvent(res));
            })
            .catch((res) => {
                console.error(`fetch event list failed.`);
                console.error(res);
                dispatcher(errorFetchEvent(res));
            });
    };
}

/**
 * SoundCloud API用Token取得開始
 * @returns Action
 */
export const startGetToken = (): any => {
    return {
        type: Const.Action.Type.GetSoundCloudTokenStart
    };
}

/**
 * SoundCloud API用Token取得成功
 * @returns Action
 */
export const successGetToken = (response: superagent.Response): any => {
    return {
        type: Const.Action.Type.GetSoundCloudTokenSuccess,
        res: response.text
    };
}

/**
 * SoundCloud API用Token取得失敗
 * @returns Action
 */
export const errorGetToken = (response: superagent.Response): any => {
    return {
        type: Const.Action.Type.GetSoundCloudTokenError,
        res: response.body
    };
}

/**
 * SoundCloud API用Tokenを非同期に取得する
 * @returns Action
 */
export const getTokenAsync = (): any => {
    return (dispatcher: Function) => {
        dispatcher(startGetToken);

        callApi(Const.Service.SOUND_CLOUD_TOKEN_FILE, "get")
            .then((res) => {
                dispatcher(successGetToken(res));
            })
            .catch((res) => {
                console.error(`get token failed.`);
                console.error(res);
                dispatcher(errorGetToken(res));
            });
    };
}
