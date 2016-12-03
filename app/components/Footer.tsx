import * as React from "react"

import * as Const from "../constants"

export interface FooterProps {
}

/**
 * フッター
 */
export class Footer extends React.Component<FooterProps,any> {
    constructor(
        public props: FooterProps,
        public context: any
    ) {
        super(props, context);
    }

    /* render */
    render(): JSX.Element {
        return (
            <footer className="mdl-mini-footer">
                <div className="mdl-mini-footer__left-section">
                    <div className="mdl-logo">{Const.Message.NAME_APP_EN}</div>
                    <ul className="mdl-mini-footer__link-list">
                        <li><span>© 2016 mizuku.</span></li>
                        <li><a href="https://github.com/mizuku/m3demoplay" target="_blank">About</a></li>
                        <li><a href="https://twitter.com/MizukuC" target="_blank">Contact (Twitter)</a></li>
                    </ul>
                </div>
            </footer>
        );
    }
}