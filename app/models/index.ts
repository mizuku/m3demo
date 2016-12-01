import { Transition } from "./Transition"
import { Personal } from "./Personal"
import { M3State } from "./M3State"

/**
 * アプリケーション state
 */
export interface AppState {
    /**
     * 遷移状態
     */
    transition?: Transition;

    /**
     * 個人別情報
     */
    personal?: Personal;

    /**
     * M3データ
     */
    m3State?: M3State;


}
