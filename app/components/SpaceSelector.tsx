import * as React from "react"
import * as _ from "underscore"

import { SpaceSelectorItem } from "./SpaceSelectorItem"

export interface SpaceSelectorProps {
    eventId?: number;
    spaceInitials?: string[];
    excludeInitials?: string[];
    isAllSpaceSelected?: boolean;
    changeExcludeInitials?: Function;
    changeAllInitials?: Function;
}

export class SpaceSelector extends React.Component<SpaceSelectorProps,any> {
    constructor(
        public props: SpaceSelectorProps,
        public context: any
    ) {
        super(props, context);
    }

    /* component lifecycle */
    componentDidUpdate = () => {
        let listElem = this.refs["$selector-list"];
        if (listElem instanceof HTMLElement) {
            // MDL Component Upgrade
            let componentHandler = (window as any).componentHandler as MaterialDesignLite.ComponentHandler;
            componentHandler.upgradeElements(listElem);
            // toggleSwitchの見た目を手動で更新する
            let switches = listElem.querySelectorAll(".mdl-js-switch");
            if (switches) {
                // NodeListOf は古典的for文しか使えない
                for (let i = 0; i < switches.length; i++) {
                    let s = switches.item(i);
                    // .MaterialSwitch.checkToggleState() で現在のstateに見た目を合わせてくれるみたい
                    (s as any).MaterialSwitch.checkToggleState();
                }
            }
        }
    }

    /**
     * 除外するサークルスペース頭文字の変更イベント
     */
    changeExcludeInitials = (initials: string, isChecked: boolean) => {
        this.props.changeExcludeInitials(initials, isChecked);
    }

    /**
     * すべてのサークルスペースを有効/除外するイベント
     */
    changeAllToggle = (initials: string, isChecked: boolean) => {
        this.props.changeAllInitials(this.props.spaceInitials, isChecked);
    }

    /* render */
    render(): JSX.Element {
        let itemElements = this.props.spaceInitials.map((v) => {
            let isChecked = false == _.contains(this.props.excludeInitials, v);
            return (
                <SpaceSelectorItem key={`${this.props.eventId}${v}`}
                    spaceInitials={v}
                    isChecked={isChecked}
                    changeChecked={this.changeExcludeInitials}
                    />
            );
        });
        return (
            <ul className="demo-space-selector mdl-list"
                ref="$selector-list">
                <SpaceSelectorItem key="spaceSelectorAll"
                    spaceInitials="すべて"
                    isChecked={this.props.isAllSpaceSelected}
                    changeChecked={this.changeAllToggle}
                    />
                {itemElements}
            </ul>
        );
    }
}
