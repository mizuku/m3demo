/**
 * 視聴音源情報(保存形式)
 */
export interface SaveDemo {
    /**
     * デモID
     */
    id: string;

    /**
     * サークル名
     */
    ci: string;

    /**
     * スペース
     */
    sp: string;

    /**
     * スペースの頭文字
     */
    si: string;

    /**
     * コメント
     */
    cm: string;

    /**
     * 音源URL
     */
    u: string;

    /**
     * 音源のプレイヤータイプ
     */
    pt: string;
}
