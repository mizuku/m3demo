import { Url, format, parse, resolve } from "url"
import * as _ from "underscore"

/**
 * URL 変換パラメータ
 */
export interface UrlTransform {
    /** 即売会 */
    event: boolean;
    /** 即売会イベントID */
    eventId: number;
    /** お気に入り */
    favs: boolean;
}

/**
 * URL プロバイダー
 */
export class UrlProvider {
    /** URL文字列 */
    private url: string;

    /** URLの形式 */
    private urlFormat: string = "";

    /** 履歴モード */
    public historyMode: "browser" | "hash";

    /**
     * コンストラクタ
     */
    public constructor() {
        this.historyMode = "browser";
    }

    /**
     * 現在の URL をパースして変換パラメータを返す
     */
    public parse(): UrlTransform {
        let u = parse(location.href, false, false);
        //u.pathname
        return {
            event: false,
            eventId: 0,
            favs: false
        };
    }

}
