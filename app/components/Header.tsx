import * as React from "react"

import { Menu, MenuItem } from "./Menu"

export interface HeaderProps {
    searchText?: string;
    displayPerPage?: number;

    searchTextChanged?: Function;
    search?: Function;
    displayPerPageChanged?: Function;
}

export class Header extends React.Component<HeaderProps,any> {
    constructor(
        public props:HeaderProps,
        public context:any
    ) {
        super(props, context);
    }

    /**
     * 1ページに表示する数リスト
     */
    private displayPerPageItems: MenuItem[] = [
        { label: "4（推奨）", value: "4" }, { label: "8", value: "8" }, { label: "12", value: "12" }
    ]

    /**
     * 検索を実行する
     */
    onChangeSearchText = (ev: React.FormEvent) => {
        let text = (ev.target as HTMLInputElement).value;
        this.props.searchTextChanged(text);
    }

    /**
     * 検索フォームのSubmitイベント
     */
    onSubmit = (ev: React.FormEvent) => {
        ev.preventDefault();
        let text = (this.refs["$searchTextField"] as HTMLInputElement).value;
        this.props.search(text);
    }

    /**
     * 1ページに表示する数変更イベント
     */
    onPerPageChanged = (value: string) => {
        this.props.displayPerPageChanged(parseInt(value));
    }

    /* render */
    render(): JSX.Element {
        return (
            <header className="demo-header mdl-layout__header mdl-layout__header--waterfall">
                <div className="mdl-layout__header-row">
                    <h1 className="demo-header__title mdl-layout-title">M3 試聴音源 プレイリスト</h1>
                    <div className="mdl-layout-spacer"></div>
                    <form onSubmit={this.onSubmit}
                        className="demo-header__search-textfield mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--align-right">
                        <label className="mdl-button mdl-js-button mdl-button--icon"
                            htmlFor="demo-search-textfield">
                            <i className="material-icons">search</i>
                        </label>
                        <div className="mdl-textfield__expandable-holder">
                            <input className="mdl-textfield__input"
                                type="text"
                                name="search-textfield"
                                id="demo-search-textfield"
                                ref="$searchTextField"
                                value={this.props.searchText}
                                onChange={this.onChangeSearchText}
                                >
                            </input>
                            <label className="demo-header__search-textfield-label mdl-textfield__label"
                                htmlFor="demo-search-textfield">
                                サークル名
                            </label>
                        </div>
                    </form>
                    <div className="mdl-layout-spacer"></div>
                    <button className="demo-header__more-button mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect"
                            id="demo-header-more-button">
                        <i className="material-icons">more_vert</i>
                    </button>
                    <Menu forName="demo-header-more-button"
                        selectedValue={this.props.displayPerPage.toString()}
                        menuLabel="1ページに表示する数"
                        items={this.displayPerPageItems}
                        selectionChanged={this.onPerPageChanged} />
                </div>
            </header>
        );
    }
}