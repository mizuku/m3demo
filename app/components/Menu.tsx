import * as React from "react"

/**
 * Viewのメニュー項目定義
 */
export interface MenuItem {
    /** ラベル */
    label?: string;
    /** 値 */
    value?: string;
}

/**
 * Menu のProps定義
 */
export interface MenuProps {
    items?: MenuItem[];
    selectedValue?: string;
    forName?: string;
    menuLabel?: string;

    selectionChanged?: Function;
}

/**
 * ドロップダウンメニュー
 */
export class Menu extends React.Component<MenuProps,any> {
    constructor(
        public props:MenuProps,
        public context:any
    ) {
        super(props, context);
    }

    /**
     * メニューグループのラベルエレメント
     */
    private menuLabelElement: JSX.Element;

    /**
     * メニュー項目のエレメント
     */
    private menuItemElements: JSX.Element[];

    /**
     * メニュー項目の選択イベント
     */
    onSelectMenuItem = (ev: React.FormEvent) => {
        let value = (ev.target as HTMLElement).dataset["value"];
        if (this.props.selectedValue != value)
        {
            this.props.selectionChanged(value);
        }
    }

    /* component lifecycle */
    componentWillMount = () => {
        this.componentMount();
    }

    componentWillUpdate = (nextProps: MenuProps, nextState: any) => {
        this.componentMount(nextProps, nextState);
    }
    /* component lifecycle */

    protected componentMount = (nextProps?: MenuProps, nextState?: any) => {
        let props = nextProps || this.props;
        // menu label
        if (!nextProps || this.props.menuLabel != nextProps.menuLabel) {
            if (props.menuLabel) {
                this.menuLabelElement = (
                    <li className="demo-menu__label mdl-menu__item" disabled>{props.menuLabel}</li>
                );
            } else {
                this.menuLabelElement = null;
            }
        }
        // items
        if (!nextProps || this.props.items != nextProps.items
            || this.props.selectedValue != nextProps.selectedValue) {
            this.menuItemElements = props.items.map((v) => {
                let selectionClass = "";
                if (v.value == props.selectedValue) {
                    selectionClass = " demo-menu__item--is-selected";
                }
                return (
                    <li className={`mdl-menu__item ${selectionClass}`}
                        data-value={v.value}
                        key={v.value}
                        onClick={this.onSelectMenuItem}>{v.label}</li>
                );
            });
        }
    }

    /* render */
    render(): JSX.Element {
        return (
            <ul className="mdl-menu mdl-js-menu mdl-menu--bottom-right mdl-js-ripple-effect"
                htmlFor={this.props.forName}>
                {this.menuLabelElement}
                {this.menuItemElements}
            </ul>
        );
    }
}