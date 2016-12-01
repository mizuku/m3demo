import { SaveDemo } from "./SaveDemo"

/**
 * 個人別情報(保存形式)
 */
export interface SavePersonal {
    /**
     * お気に入り音源情報(保存形式)
     */
    favs: { [eventId: number]: SaveDemo[] };
}