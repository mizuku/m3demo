import * as superagent from "superagent"
import { Promise } from "es6-promise"

import { ApiSound, ApiSoundRedirect } from "../models/Api/ApiSoundCloud"
import { Demo } from "../models/Demo"
import * as Const from "../constants"
import { callApi } from "./Action"

/**
 * 楽曲情報取得開始 ActionCreator
 * @param url 楽曲URL
 * @returns 楽曲情報取得開始Action
 **/
function startGetSoundInfoFromUrl(id: string, url: string): any {
    return {
        type: Const.Action.Type.GetSoundInfoFromUrlStart,
        id: id,
        url: url
    }
}

/**
 * 楽曲情報取得成功 ActionCreator
 * @param response 成功レスポンス
 * @param id 楽曲ID
 * @returns 楽曲情報取得成功Action
 **/
function successGetSoundInfoFromUrl(response: superagent.Response, id: string): any {
    return {
        type: Const.Action.Type.GetSoundInfoFromUrlSuccess,
        res: response.body,
        id: id
    }
} 

/**
 * 楽曲情報取得失敗 ActionCreator
 * @param response エラーレスポンス
 * @param id 楽曲ID
 * @param url 楽曲URL
 * @returns 楽曲情報取得失敗Action
 **/
function errorGetSoundInfoFromUrl(response: superagent.Response, id: string, url: string): any {
    return {
        type: Const.Action.Type.GetSoundInfoFromUrlError,
        res: response.body,
        id: id,
        errorUrl: url
    }
}

/**
 * 試聴音源に対応する埋め込みプレイヤー用URLを非同期で取得します
 * @param demo 試聴音源情報
 * @returns 非同期実行する関数
 */
export const getEmbedUrlAsync = (demo: Demo): any => {
    switch (demo.playerType) {
        case Const.Domain.PLAYER_YOUTUBE:
            return {
                type: Const.Action.Type.GetYoutubeEmbedUrl,
                id: demo.id
            };
        case Const.Domain.PLAYER_SOUNDCLOUD:
            return (dispatcher: Function) => {
                dispatcher(startGetSoundInfoFromUrl(demo.id, demo.url));
                let token = "";
                if ((Window as any).prototype.__getToken) {
                    token = (Window as any).prototype.__getToken();
                }
                return callApi(Const.Service.SOUND_CLOUD_TRACK_API, "get", {
                    url: demo.url,
                    client_id: token
                    }).then((res) => {
                        if (res.redirect) {
                            // redirect なら redirect先にアクセス
                            let redirect = res.body as ApiSoundRedirect;
                            return callApi(redirect.location, "get");
                        } else {
                            // redirect でなければそのまま返す
                            return new Promise((resolve, reject) => {
                                resolve(res);
                            });
                        }
                    }).then((res) => {
                        dispatcher(successGetSoundInfoFromUrl(res, demo.id));
                    }).catch((res) => {
                        dispatcher(errorGetSoundInfoFromUrl(res, demo.id, demo.url));
                    });
            }
        default:
            console.log(`埋め込みプレイヤーURLを取得する必要が無い音源。
            id=${demo.id}, circle=${demo.circle}, url=${demo.url}`);
            return {
                type: Const.Action.Type.EmptyEmbedUrl
            };
    }
}
