import { Demo } from "./Demo"

/**
 * 個人別情報
 */
export interface Personal {
    /**
     * お気に入り音源情報
     */
    favorites: { [eventId: number]: Demo[] };

}
