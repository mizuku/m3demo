import { Demo } from "./Demo"

/**
 * 遷移パラメータ
 */
export interface Transition {
    /**
     * 表示中のページの種類
     */
    pageType: string;

    /**
     * 現在の試聴音源データソースの種類
     */
    currentDemoSource: string;

    /**
     * 1ページあたりの表示数
     */
    displayPerPage: number;

    /**
     * 検索文字列
     */
    searchText: string;

    /**
     * 空白で検索文字列を分割したもの
     * @remarks 検索処理で使用する
     */
    splitSearchText: string[];

    /**
     * 現在の即売会ID
     */
    currentEventId: number;

    /**
     * 選択から除外するサークルスペース頭文字
     */
    excludeInitials: string[];

    /**
     * お気に入りだけを表示するかどうか
     */
    isFavoriteOnly: boolean;

    /**
     * 現在のページ数
     */
    currentPage: number;
}
