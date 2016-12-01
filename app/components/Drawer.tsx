import * as React from "react"
import * as ReactCSSTransitionGroup from "react-addons-css-transition-group"

import { AppSaleEvent } from "../models/M3State"

import { SpaceSelector } from "./SpaceSelector"
import { Menu, MenuItem } from "./Menu"

/**
 * Drawer のProps定義
 */
export interface DrawerProps {
    events?: AppSaleEvent[];
    spaceInitials?: string[];
    currentEventId?: number;
    excludeInitials?: string[];
    isFavoriteOnly?: boolean;
    isAllSpaceSelected?: boolean;
    changeEvent?: Function;
    changeExcludeInitials?: Function;
    changeFavoriteOnly?: Function;
    changeAllInitials?: Function;
}

/**
 * ドロワー
 */
export class Drawer extends React.Component<DrawerProps,any> {
    constructor(
        public props: DrawerProps,
        public context: any
    ) {
        super(props, context);
    }

    protected eventItems: MenuItem[] = [];
    private onFirstLoaded: boolean = false;

    /* component lifecycle */
    componentWillMount = () => {
        this.eventItems = this.props.events.map(this.appEventToEventItem);
    }

    componentWillUpdate = (nextProps: DrawerProps, nextState: any) => {
        this.eventItems = nextProps.events.map(this.appEventToEventItem);
    }

    componentDidUpdate = () => {
        let selectorElem = this.refs["$space-selector"];
        if (!!selectorElem && selectorElem instanceof HTMLElement) {
            // MDL Component Upgrade
            let componentHandler = (window as any).componentHandler as MaterialDesignLite.ComponentHandler;
            componentHandler.upgradeElements(selectorElem);
        }
        // 初回読み込み
        if (!this.onFirstLoaded && 0 < this.props.currentEventId) {
            this.onFirstLoaded = true;
            this.props.changeEvent(this.props.currentEventId);
        }
    }
    /* component lifecycle */

    /**
     * 即売会情報をイベントメニューアイテムに変換する
     */
    protected appEventToEventItem = (event: AppSaleEvent) => {
        return {
            label: event.eventName,
            value: `${event.eventId}`
        };
    }

    /**
     * イベントを変更したときのイベント
     * @param value 選択したイベントのイベントID
     */
    protected eventSelectionChanged = (value: string) => {
        let eventId = parseInt(value);
        if (eventId !== this.props.currentEventId) {
            this.props.changeEvent(eventId);
        }
    }

    /**
     * お気に入り表示スイッチを変更したときのイベント
     */
    protected favoriteOnlyChecked = (ev: React.FormEvent) => {
        this.props.changeFavoriteOnly(!this.props.isFavoriteOnly);
    }

    /* render */
    render(): JSX.Element {
        let currentEventName = "";
        if (0 < this.props.currentEventId) {
            currentEventName = this.props.events.filter((ev) => {
                return ev.eventId == this.props.currentEventId;
            }).map((ev) => {
                return ev.eventName;
            })[0];
        } else {
            currentEventName = "右のボタンから選択";
        }
        let favoriteMemo = "";
        if (!this.props.isFavoriteOnly) {
            favoriteMemo = "お気に入りONにするとサークルスペースの選択は無効になります"
        }
        let spaceSelector: JSX.Element;
        if (!this.props.isFavoriteOnly) {
            spaceSelector = (
                <section className="demo-drawer__section accordion"
                    key="spaceSelectors"
                    ref="$space-selector">
                    <h5 className="demo-drawer__section-title">サークルスペースを選ぶ</h5>
                    <SpaceSelector
                        eventId={this.props.currentEventId}
                        spaceInitials={this.props.spaceInitials}
                        excludeInitials={this.props.excludeInitials}
                        isAllSpaceSelected={this.props.isAllSpaceSelected}
                        changeExcludeInitials={this.props.changeExcludeInitials}
                        changeAllInitials={this.props.changeAllInitials}
                        />
                </section>
            );
        }
        return (
            <div className="demo-drawer mdl-layout__drawer">
                <span className="demo-drawer__title mdl-layout-title">M3 Demo Playlist</span>
                <section className="demo-drawer__section">
                    <h5 className="demo-drawer__section-title">即売会を選ぶ</h5>
                    <div className="demo-event-dropdown">
                        <span>{currentEventName}</span>
                        <div className="mdl-layout-spacer"></div>
                        <button id="event-selector-btn"
                            className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                            <i className="material-icons" role="presentation">arrow_drop_down</i>
                            <span className="visuallyhidden">Events</span>
                        </button>
                        <Menu forName="event-selector-btn"
                            items={this.eventItems}
                            selectedValue={this.props.currentEventId.toString()}
                            selectionChanged={this.eventSelectionChanged}
                            />
                    </div>
                </section>
                <section className="demo-drawer__section">
                    <h5 className="demo-drawer__section-title">
                        <i className="material-icons star demo-drawer__section-title-icon">star</i>
                        <span className="demo-drawer__section-title-text">お気に入り</span>
                        <span className="demo-drawer__section-title-switch">
                            <label className="mdl-switch mdl-js-switch mdl-js-ripple-effect"
                                htmlFor="drawer-switch-favorite">
                                <input type="checkbox" id="drawer-switch-favorite"
                                    className="mdl-switch__input"
                                    checked={this.props.isFavoriteOnly}
                                    onChange={this.favoriteOnlyChecked} />
                            </label>
                        </span>
                    </h5>
                    <span className="demo-drawer__favorite-memo">{favoriteMemo}</span>
                </section>
                <ReactCSSTransitionGroup
                    className="accordion-container"
                    transitionName="accordion"
                    transitionEnterTimeout={200}
                    transitionLeaveTimeout={200}>
                    {spaceSelector}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}