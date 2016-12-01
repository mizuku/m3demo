import * as React from "react"

import * as Const from "../../constants"
import { Demo } from "../../models/Demo"

/**
 * NiconicoPlayer の Props
 */
export interface NiconicoPlayerProps {
    demo?: Demo;
    getEmbedUrl?: Function;
}

/**
 * ニコニコ動画外部プレーヤーを作成する
 * @remarks SPA対応されてないので現在作成不可。リンクでお茶を濁す
 */
export class NiconicoPlayer extends React.Component<NiconicoPlayerProps, any> {
    constructor(
        public props: NiconicoPlayerProps,
        public context: any
    ) {
        super(props, context);
    }

    /* lifecycle event */
    componentDidMount = () => {
        // let container = this.refs["niconicoContainer"] as HTMLElement;
        // if (container) {
        //     let videoId = (this.props.url.match(/watch\/(.+)($|\?)/i)||[])[1];
        //     if (videoId) {
        //         let src = `http://ext.nicovideo.jp/thumb_watch/${videoId}`
        //                 + `?w=480&h=270`;
        //         let scriptElem = document.createElement("script");
        //         scriptElem.src = src;
        //         scriptElem.async = true;
        //         container.appendChild(scriptElem);
        //     }
        // }
    }

    componentWillUnmount = () => {
        // let container = this.refs["niconicoContainer"] as HTMLElement;
        // if (container) {
        //     let children = container.children;
        //     for (let i = 0; i < children.length; ++i) {
        //         console.log(children.item(i));
        //         container.removeChild(children.item(i));
        //     }
        // }
    }
    /* lifecycle event */

    /* render */
    render(): JSX.Element {
        return (
            <div className="card__failed-container" ref="niconicoContainer">
                <p>本サイトではこの音源を視聴できません。下のリンクへアクセスしてください。</p>
                <h4>ニコニコ動画へのリンク</h4>
                <a href={this.props.demo.url} target="_blank">{this.props.demo.url}</a>
            </div>
        );
    }
}

