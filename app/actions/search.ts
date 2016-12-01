import { Transition } from "../models/Transition"
import * as Const from "../constants"

/**
 * 試聴音源検索文字列変更
 * @param searchText 変更後の検索文字列
 */
export const searchTextChanged = (searchText: string): any => {
    return {
        type: Const.Action.Type.SearchTextChanged,
        searchText: searchText
    };
}

/**
 * 試聴音源の検索
 * @param searchText 検索文字列
 */
export const searchDemo = (searchText: string): any => {
    return {
        type: Const.Action.Type.NarrowingSearchDemo,
        searchText: searchText
    };
}

/**
 * 1ページに表示する数の変更
 * @param num 変更後の1ページ表示数
 */
export const changeDisplayPerPage = (num: number): any => {
    return {
        type: Const.Action.Type.ChangeDisplayPerPage,
        num: num
    };
}

/**
 * 除外するサークルスペース頭文字の変更
 * @param initials サークルスペース頭文字
 * @param isChecked チェック状態
 */
export const changeExcludeInitials = (initials: string, isChecked: boolean): any => {
    return {
        type: Const.Action.Type.ChangeExcludeInitials,
        initials: initials,
        isChecked: isChecked
    };
}

/**
 * すべてのサークルスペースを有効/除外を変更する
 * @param initials サークルスペース頭文字
 * @param isChecked チェック状態
 */
export const changeAllInitials = (initials: string[], isChecked: boolean): any => {
    return {
        type: Const.Action.Type.ChangeAllInitials,
        initials: initials,
        isChecked: isChecked
    };
}

/**
 * お気に入りのみ表示の変更
 * @param isFavoriteOnly お気に入りのみ表示かどうか
 */
export const changeFavoriteOnly = (isFavoriteOnly: boolean): any => {
    if (isFavoriteOnly) {
        return {
            type: Const.Action.Type.SearchFavorite
        };
    } else {
        return {
            type: Const.Action.Type.SearchAll
        }
    }
}

/**
 * ページを変更する
 * @param nextPage 遷移先のページを表す数値
 */
export const turnToPage = (nextPage: number) => {
    return {
        type: Const.Action.Type.TurnToPage,
        nextPage: nextPage
    };
}