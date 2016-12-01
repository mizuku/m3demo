import * as _ from "underscore"

import { M3State } from "../models/M3State"
import { Demo } from "../models/Demo"
import { ApiDemo, ApiDemoDictionary } from "../models/Api/ApiDemo"
import { ApiSound } from "../models/Api/ApiSoundCloud"
import { ApiSaleEvent } from "../models/Api/ApiSaleEvent"
import * as Const from "../constants"

let initialState: M3State = {
    events: [],
    currentEventId: 0,
    saleEvents: {}
};

/**
 * M3State のReducer
 */
export const m3State = (state: M3State = initialState , action: any): M3State => {
    switch (action.type) {
        case Const.Action.Type.FetchEventSuccess:
        /* アプリケーション即売会情報Fetch成功 */
        {
            let newState = _.extend({}, state) as M3State;
            let events = action.res as ApiSaleEvent[];
            if (Array.isArray(events)) {
                newState.events = events.map((ev) => {
                    return {
                        eventId: ev.id,
                        eventName: ev.name
                    };
                })
            }
            return newState;
        }
        case Const.Action.Type.FetchEventError:
        /* アプリケーション即売会情報Fetch失敗 */
        {
            let newState = _.extend({}, state) as M3State;
            newState.events = [];
            return newState;
        }
        case Const.Action.Type.FetchDemosSuccess:
        /* 音源情報Fetch成功 */
        {
            let newState = _.extend({}, state) as M3State;
            let eventId = action.eventId as number;
            newState.currentEventId = eventId;
            if (!newState.saleEvents[eventId]) {
                let demos: Demo[];
                let dict = action.res as ApiDemoDictionary;
                let apiDemos:ApiDemo[] = [];
                // dict にはスペース順でソート済みのデータが入っている
                for (let key in dict) {
                    apiDemos.push(dict[key]);
                }
                // stateに設定する情報
                demos = apiDemos.map((v) => {
                    // とりあえずサークル名とコメントの実体参照を戻す
                    return {
                        id: v.id,
                        circle: _.unescape(v.circle).replace(/&#39;/g, "'"),
                        space: v.space,
                        spaceInitials: v.space.slice(0, 1),
                        comment: _.unescape(v.comment).replace(/&#39;/g, "'"),
                        url: v.URL,
                        playerType: urlToPlayerType(v.URL),
                        embedUrl: "",
                        isTryEmbedUrl: false
                    };
                }).sort((a, b) => {
                    // 描画コストのほうが怖いので念のためソート
                    let c0 = a.space.localeCompare(b.space);
                    return c0 == 0 ? a.id.localeCompare(b.id) : c0;
                });

                newState.saleEvents[eventId] = {
                    eventId: eventId,
                    demos: demos,
                    spaceInitials: ((arr: Demo[]) => {
                        let initials: string[] = [];
                        arr.forEach((v) => {
                            if (!_.contains(initials, v.spaceInitials)) {
                                initials.push(v.spaceInitials);
                            }
                        });
                        return initials;
                    })(demos)
                };
            }

            return newState;
        }
        case Const.Action.Type.FetchDemosError:
        /* 音源情報Fetch失敗 */
        {
            let newState = _.extend({}, state) as M3State;
            let eventId = action.eventId as number;
            newState.currentEventId = eventId;
            newState.saleEvents[eventId] = {
                eventId: eventId,
                demos: [],
                spaceInitials: []
            };
            return newState;
        }
        case Const.Action.Type.GetYoutubeEmbedUrl:
        /* Youtube埋め込みプレイヤー取得 */
        {
            let newState = _.extend({}, state) as M3State;
            let eventId = newState.currentEventId;
            let event = newState.saleEvents[eventId];
            newState.saleEvents[eventId] =  {
                eventId: eventId,
                demos: event.demos.map((v) => {
                    if (action.id == v.id) {
                        if (!v.isTryEmbedUrl) {
                            // 初回のみ取得
                            v.isTryEmbedUrl = true;
                            let videoId = (v.url.match(/v=(.+)($|\?)/i)||[])[1];
                            if (videoId) {
                                v.embedUrl = `http://www.youtube.com/embed/${videoId}`
                                    + `?autoplay=0&controls=2&fs=1&playsinline=1`;
                            }
                        }
                    }
                    return v;
                }),
                spaceInitials: event.spaceInitials
            };

            return newState;
        }
        case Const.Action.Type.GetSoundInfoFromUrlSuccess:
        /* SoundCloud埋め込みプレイヤー取得成功 */
        {
            let newState = _.extend({}, state) as M3State;
            let eventId = newState.currentEventId;
            let event = newState.saleEvents[eventId];
            let si = action.res as ApiSound;
            newState.saleEvents[eventId] = {
                eventId: event.eventId,
                demos: event.demos.map((v) => {
                    if (action.id == v.id) {
                        if (!v.isTryEmbedUrl) {
                            // 初回のみ取得
                            v.isTryEmbedUrl = true;
                            let trackId = si.id;
                            if (trackId) {
                                v.embedUrl = `https://w.soundcloud.com/player/?url=`
                                    + `https%3A//api.soundcloud.com/tracks/${trackId}&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true`
                            }
                        }
                    }
                    return v;
                }),
                spaceInitials: event.spaceInitials
            };

            return newState;
        }
        case Const.Action.Type.GetSoundInfoFromUrlError:
        /* SoundCloud埋め込みプレイヤー取得失敗 */
        {
            let newState = _.extend({}, state) as M3State;
            let eventId = newState.currentEventId;
            let event = newState.saleEvents[eventId];
            let si = action.res as ApiSound;
            newState.saleEvents[eventId] = {
                eventId: event.eventId,
                demos: event.demos.map((v) => {
                    if (action.id == v.id) {
                        if (!v.isTryEmbedUrl) {
                            v.isTryEmbedUrl = true;
                            v.embedUrl = "";
                        }
                    }
                    return v;
                }),
                spaceInitials: event.spaceInitials
            };

            return newState;
        }
        case Const.Action.Type.EmptyEmbedUrl:
        /* 埋め込みプレイヤー不要。何もしない */
        {
            return state;
        }
        default:
        {
            return state;
        }
    }
}

/**
 * URLからプレイヤータイプを求める
 * @param url 楽曲URL
 * @returns プレイヤータイプ
 */
const urlToPlayerType = (url: string): string => {
    // プレイヤータイプを決める
    if (url.indexOf(Const.Domain.DOMAIN_YOUTUBE) > -1) {
        return Const.Domain.PLAYER_YOUTUBE;
    } else if (url.indexOf(Const.Domain.DOMAIN_NICONICO) > -1) {
        return Const.Domain.PLAYER_NICONICO;
    } else if (url.indexOf(Const.Domain.DOMAIN_SOUNDCLOUD) > -1) {
        return Const.Domain.PLAYER_SOUNDCLOUD;
    } else {
        return Const.Domain.PLAYER_NATIVE;
    }
}

export default m3State