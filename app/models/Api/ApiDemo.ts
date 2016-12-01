/**
 * API レスポンスの 試聴音源情報
 * @link http://www.m3net.jp/cgi/about_API.html
 */
export interface ApiDemo {
    /**
     * デモID
     */
    id: string;

    /**
     * サークル名
     */
    circle?: string;

    /**
     * スペース
     */
    space: string;

    /**
     * コメント
     */
    comment?: string;

    /**
     * 試聴音源のURL
     */
    URL: string;
}

/**
 * API レスポンスの 試聴音源の頭
 */
export interface ApiDemoDictionary {
    [key: string]: ApiDemo;
}
