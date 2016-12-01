import { SavePersonal } from "./SavePersonal"

/**
 * Storageに保存するためのデータ形式
 */
export interface SaveData {
    /**
     * データ構造のバージョン
     */
    version: number;

    /**
     * 個人別情報(保存形式)
     */
    personal: SavePersonal;

}
