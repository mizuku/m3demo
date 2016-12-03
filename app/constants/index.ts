/**
 * Action 定義
 */
export namespace Action {
    /**
     * Action の type 定義
     */
    export const enum Type {
        /** アプリケーション起動 */
        AppLoad,
        /** 即売会ID一覧取得開始 */
        FetchEventStart,
        /** 即売会ID一覧取得成功 */
        FetchEventSuccess,
        /** 即売会ID一覧取得失敗 */
        FetchEventError,
        /** SoundCloud API用Token取得開始 */
        GetSoundCloudTokenStart,
        /** SoundCloud API用Token取得成功 */
        GetSoundCloudTokenSuccess,
        /** SoundCloud API用Token取得失敗 */
        GetSoundCloudTokenError,
        /** イベント情報の取得開始 */
        FetchDemosStart,
        /** イベント情報の取得成功 */
        FetchDemosSuccess,
        /** イベント情報の取得失敗 */
        FetchDemosError,
        /** Youtube埋め込み用URL取得 */
        GetYoutubeEmbedUrl,
        /** SoundCloud埋め込み用URL取得開始 */
        GetSoundInfoFromUrlStart,
        /** SoundCloud埋め込み用URL取得成功 */
        GetSoundInfoFromUrlSuccess,
        /** SoundCloud埋め込み用URL取得失敗 */
        GetSoundInfoFromUrlError,
        /** 埋め込みURL不要 */
        EmptyEmbedUrl,
        /** 試聴音源検索文字列変更 */
        SearchTextChanged,
        /** 試聴音源の絞込検索 */
        NarrowingSearchDemo,
        /** 1ページに表示する数変更 */
        ChangeDisplayPerPage,
        /** 除外するサークルスペース頭文字の変更 */
        ChangeExcludeInitials,
        /** サークルスペースの有効/除外を変更する */
        ChangeAllInitials,
        /** ページを変更する */
        TurnToPage,
        /** お気に入りを変更する */
        ChangeFavorite,
        /** すべてから探す */
        SearchAll,
        /** お気に入りから探す */
        SearchFavorite
    }
}

/**
 * ドメイン領域で扱う定義
 */
export namespace Domain {
    /**
     * 音源再生プレイヤーがYoutube
     */
    export const PLAYER_YOUTUBE: string = "youtube";

    /**
     * 音源再生プレイヤーがニコニコ
     */
    export const PLAYER_NICONICO: string = "niconico";

    /**
     * 音源再生プレイヤーがSoundCloud
     */
    export const PLAYER_SOUNDCLOUD: string = "soundcloud";

    /**
     * 音源再生プレイヤーがHTML5ネイティブ
     */
    export const PLAYER_NATIVE: string = "native";

    /**
     * Youtubeのドメイン
     */
    export const DOMAIN_YOUTUBE: string = "www.youtube.com";
    /**
     * ニコニコ動画のドメイン
     */
    export const DOMAIN_NICONICO: string = "www.nicovideo.jp";
    /**
     * SoundCloudのドメイン
     */
    export const DOMAIN_SOUNDCLOUD: string = "soundcloud.com";

    /**
     * ページの種類: 試聴音源一覧
     */
    export const PAGE_TYPE_DEMOLIST: string = "demoList";

    /**
     * ページの種類: about
     */
    export const PAGE_TYPE_ABOUT: string = "about";

    /**
     * 現在の試聴音源データソース: すべて
     */
    export const CURRENT_DEMO_ALL: string = "all";

    /**
     * 現在の試聴音源データソース: お気に入り
     */
    export const CURRENT_DEMO_FAVORITE: string = "favorite";
    
}

/**
 * Service の定義
 */
export namespace Service {
    /**
     * アプリケーション即売会情報
     */
    export const APP_EVENTS: string = "./events.json";
    /**
     * M3 試聴音源リスト取得API
     */
    export const DEMO_API:string = "http://www.m3net.jp/cgi/get_samples.php";
    /**
     * SoundCloudの楽曲URLから楽曲情報を取得するAPI
     */
    export const SOUND_CLOUD_TRACK_API: string = "https://api.soundcloud.com/resolve.json";
    /**
     * SoundCloudのTokenファイル
     */
    export const SOUND_CLOUD_TOKEN_FILE: string = "./sc.to";
}

/**
 * Message の定義
 */
export namespace Message {
    /** アプリケーション名 (日本語) */
    export const NAME_APP_JP = "M3 視聴音源 プレイヤー";
    /** アプリケーション名 (英語) */
    export const NAME_APP_EN = "M3 demo player";
    /** システムとして対応していない形式エラー */
    export const ERROR_UNDEFINED_TYPE = "未対応の形式です。こちらまでお問い合わせください。";
}
