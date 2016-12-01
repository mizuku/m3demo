import * as React from "react"

/**
 * Pagination のprops定義
 */
export interface PaginationProps {
    currentPage?: number;
    pageCount?: number;
    turnToPage?: Function;
}

/**
 * コンテンツのページャ
 */
export class Pagination extends React.Component<PaginationProps, any> {
    constructor(
        public props:PaginationProps,
        public context:any
    ) {
        super(props, context);
    }

    /**
     * 前ページに移動
     * @param ev MouseEvent
     */
    protected turnToBack = (ev: React.MouseEvent) => {
        if (0 < this.props.currentPage) {
            this.props.turnToPage(this.props.currentPage - 1);
        }
    }

    /**
     * 次ページに移動
     * @param ev MouseEvent
     */
    protected turnToForward = (ev: React.MouseEvent) => {
        if (this.props.currentPage < this.props.pageCount - 1) {
            this.props.turnToPage(this.props.currentPage + 1);
        }
    }

    /**
     * 指定ページに移動
     * @param ev UIEvent
     */
    protected turnToPageNumber = (ev: React.FormEvent) => {
        let elem = ev.target;
        if (elem instanceof HTMLElement) {
            let toPage = elem.dataset["page"];
            if (!toPage) {
                // mdl-js-button が展開されてDOM構造が変わるためparentを見る
                toPage = elem.parentElement.dataset["page"];
            }
            if (toPage) {
                this.props.turnToPage(parseInt(toPage));
            }
        }
    }

    /* component lifecycle */
    componentDidUpdate = () => {
        let container = this.refs["$pagination-container"];
        if (container instanceof HTMLElement) {
            // MDL Component Upgrade
            let componentHandler = (window as any).componentHandler as MaterialDesignLite.ComponentHandler;
            componentHandler.upgradeElements(container);
        }
    }

    /* render */
    render(): JSX.Element {
        if (this.props.pageCount < 1) {
            // ゼロ件は何も表示しない
            return null;
        }

        let currentPage = this.props.currentPage;
        // before link
        let beforeLinkElems: JSX.Element[] = [];
        for (let i = 1; i <= 2 && 0 <= (currentPage - i); i++) {
            let elem = (
                <button className={`demo-pagination__page-link mdl-button mdl-js-button mdl-js-ripple-effect mdl-color--white
                                    demo-pagination__page-link-range-${i}`}
                    onClick={this.turnToPageNumber}
                    key={currentPage - i}
                    data-page={currentPage - i}
                    role="pagination">
                    {currentPage + 1 - i}
                </button>
            );
            beforeLinkElems.push(elem);
        }
        for (let i = beforeLinkElems.length + 1; i <= 2; i++) {
            let elem = (
                <div className={`demo-pagination__page-link-range-${i} mdl-layout-spacer`} key={currentPage - i}></div>
            );
            beforeLinkElems.push(elem);
        }
        beforeLinkElems = beforeLinkElems.reverse();
        // after link
        let afterLinkElems: JSX.Element[] = [];
        for (let i = 1; i <= 2 && (currentPage + i) < this.props.pageCount; i++) {
            let lastIcon: JSX.Element = null;
            if ((currentPage + i) == this.props.pageCount -1) {
                lastIcon = (
                    <i className="material-icons">last_page</i>
                );
            }
            let elem = (
                <button className={`demo-pagination__page-link mdl-button mdl-js-button mdl-js-ripple-effect mdl-color--white
                                    demo-pagination__page-link-range-${i}`}
                    onClick={this.turnToPageNumber}
                    key={currentPage + i}
                    data-page={currentPage + i}
                    role="pagination">
                    {currentPage + 1 + i}{lastIcon}
                </button>
            );
            afterLinkElems.push(elem);
        }
        for (let i = afterLinkElems.length + 1; i <= 2; i++) {
            let elem = (
                <div className={`demo-pagination__page-link-range-${i} mdl-layout-spacer`} key={currentPage + i}></div>
            );
            afterLinkElems.push(elem);
        }
        // back btn
        let backBtnElem = (
                <div className="demo-pagination__back-btn-container mdl-layout-spacer"></div>
            );
        if (0 < currentPage) {
            backBtnElem = (
                <div className="demo-pagination__back-btn-container">
                    <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-color--white"
                        onClick={this.turnToBack} role="pagination">
                        <i className="material-icons" role="presentation">navigate_before</i>
                    </button>
                </div>
            );
        }
        // forward btn
        let forwardBtnElem = (
                <div className="demo-pagination__forward-btn-container mdl-layout-spacer"></div>
            );
        if (currentPage < this.props.pageCount - 1) {
            forwardBtnElem = (
                <div className="demo-pagination__forward-btn-container">
                    <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--fab mdl-button--mini-fab mdl-color--white"
                        onClick={this.turnToForward} role="pagination">
                        <i className="material-icons" role="presentation">navigate_next</i>
                    </button>
                </div>
            );
        }
        // last page link
        let lastPageLinkElem = (
            <div className="mdl-layout-spacer" key="lastPage"></div>
        );
        let lastPageLinkSpacer: JSX.Element = null;
        if (currentPage < this.props.pageCount - 1) {
            let rangeClass = "demo-pagination__last-page-link";
            let sub = (this.props.pageCount - 1) - currentPage;
            switch (sub) {
                case 1:
                    rangeClass += "-1";
                    lastPageLinkSpacer = (
                        <div className="demo-pagination__last-page-link-1-spacer mdl-layout-spacer"></div>
                    );
                    break;
                case 2:
                    rangeClass += "-2";
                    lastPageLinkSpacer = (
                        <div className="demo-pagination__last-page-link-2-spacer mdl-layout-spacer"></div>
                    );
                    break;
                default:
                    rangeClass += "-later";
                    break;
            }

            lastPageLinkElem = (
                <button className={`demo-pagination__page-link mdl-button mdl-js-button mdl-js-ripple-effect mdl-color--white
                    ${rangeClass}`}
                    onClick={this.turnToPageNumber}
                    key="lastPage"
                    data-page={this.props.pageCount - 1}
                    role="pagination">
                    {this.props.pageCount}<i className="material-icons">last_page</i>
                </button>
            );
        }

        return (
            <div className="demo-pagination__container mdl-grid"
                 ref="$pagination-container">
                <nav className="demo-pagination__cell mdl-cell mdl-cell--12-col">
                    {backBtnElem}
                    <div className="mdl-layout-spacer"></div>
                    {beforeLinkElems}
                    <button className="demo-pagination__page-link demo-pagination__page-link--is-current mdl-button mdl-js-button mdl-button--primary mdl-color--white"
                        key={currentPage}
                        disabled>
                        {currentPage + 1}
                    </button>
                    {afterLinkElems}
                    {lastPageLinkElem}
                    {lastPageLinkSpacer}
                    {forwardBtnElem}
                </nav>
            </div>
        );
    }
}

