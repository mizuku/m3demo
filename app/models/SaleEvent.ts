import { Demo } from "./Demo"

/**
 * 即売会 state
 */
export interface SaleEvent {
    /**
     * 即売会ID (開催回数)
     */
    eventId: number;

    /**
     * 即売会に関連する 視聴音源
     */
    demos: Demo[];

    /**
     * スペース頭文字の配列
     */
    spaceInitials: string[];
}