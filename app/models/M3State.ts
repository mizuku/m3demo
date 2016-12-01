import { SaleEvent } from "./SaleEvent"

/**
 * M3 State
 */
export interface M3State {

    /**
     * 取り扱う販売回イベントの列挙
     */
    events: AppSaleEvent[];

    /**
     * 現在の即売会イベントID
     */
    currentEventId: number;

    /**
     * 即売会情報の配列
     */
    saleEvents: { [eventId: number]: SaleEvent };

}

/**
 * アプリケーション内で保有するイベント情報
 */
export interface AppSaleEvent {
    eventId: number;
    eventName: string;
}