import * as superagent from "superagent"

import { ApiDemo, ApiDemoDictionary } from "../models/Api/ApiDemo"
import * as Const from "../constants"
import { callApi } from "./Action"

/**
 * フェッチ開始 ActionCreator
 * @param eventId イベントID
 * @returns フェッチ開始Action
 **/
function startFetchDemos(eventId: number): any {
    return {
        type: Const.Action.Type.FetchDemosStart,
        eventId: eventId
    }
}

/**
 * フェッチ成功 ActionCreator
 * @param response 成功レスポンス
 * @param eventId イベントID
 * @returns フェッチ成功Action
 **/
function successFetchDemos(response: superagent.Response, eventId: number): any {
    return {
        type: Const.Action.Type.FetchDemosSuccess,
        res: response.body,
        eventId: eventId
    }
} 

/**
 * フェッチ失敗 ActionCreator
 * @param response エラーレスポンス
 * @param eventId イベントID
 * @returns フェッチ失敗Action
 **/
function errorFetchDemos(response: superagent.Response, eventId: number): any {
    return {
        type: Const.Action.Type.FetchDemosError,
        eventId: eventId
    }
}

/**
 * 試聴音源情報を非同期で取得します
 * @param eventId イベントID
 * @returns 非同期実行する関数
 */
export const fetchDemosAsync = (eventId: number): any => {
    return (dispatcher:Function) => {
        dispatcher(startFetchDemos(eventId));

        callApi(Const.Service.DEMO_API, "get", {
                event_id: eventId
            }).then((res) => {
                dispatcher(successFetchDemos(res, eventId));
            }).catch((res) => {
                console.error(`Fetch event info failed. event_id = ${eventId}`);
                console.error(res);
                dispatcher(errorFetchDemos(res, eventId));
            });
    }
}
