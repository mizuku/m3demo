import { Personal } from "../models/Personal"
import { Demo } from "../models/Demo"
import * as Const from "../constants"

/**
 * お気に入り変更
 * @param eventId お気に入り変更する音源を含むイベントID
 * @param demo お気に入り変更する音源情報
 * @param isFavorite 変更後のお気に入り状態
 */
export const changeFavorite = (eventId: number, demo: Demo, isFavorite: boolean): any => {
    return {
        type: Const.Action.Type.ChangeFavorite,
        eventId: eventId,
        demo: demo,
        isFavorite: isFavorite
    };
}

/**
 * お気に入りから探す
 */
export const searchFavorite = (): any => {
    return {
        type: Const.Action.Type.SearchFavorite
    };
}

/**
 * すべてから探す
 */
export const searchAll = (): any => {
    return {
        type: Const.Action.Type.SearchAll
    }
}
