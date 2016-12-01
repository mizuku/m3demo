import * as Const from "../constants"

/**
 * デモパラメータ
 */
export interface Demo {
    /**
     * デモID
     */
    id: string;

    /**
     * サークル名
     */
    circle: string;

    /**
     * スペース
     */
    space: string;

    /**
     * スペースの頭文字
     */
    spaceInitials: string;

    /**
     * コメント
     */
    comment: string;

    /**
     * 音源URL
     */
    url: string;

    /**
     * 音源のプレイヤータイプ
     */
    playerType: string;

    /**
     * embed プレイヤー用のURL
     */
    embedUrl: string;

    /**
     * 音源URLから埋め込みプレイヤーの取得を試みたかどうか
     */
    isTryEmbedUrl: boolean;

}
