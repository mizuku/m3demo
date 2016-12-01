import * as React from "react"

import * as Const from "../../constants"
import { Demo } from "../../models/Demo"

/**
 * YoutubePlayer の Props
 */
export interface YoutubePlayerProps {
    demo?: Demo;
    getEmbedUrl?: Function;
}

/**
 * Youtube HTML埋め込みプレイヤーを作成する
 */
export class YoutubePlayer extends React.Component<YoutubePlayerProps, any> {
    constructor(
        public props: YoutubePlayerProps,
        public context: any
    ) {
        super(props, context);
    }

    /* lifecycle event */
    componentWillMount(): void {
        if (!this.props.demo.isTryEmbedUrl) {
            // 埋め込みプレイヤーのURLを取得する
            this.props.getEmbedUrl(this.props.demo);
        }
    }
    /* lifecycle event */

    /* render */
    render(): JSX.Element {
        let demo = this.props.demo;
        if (!demo.isTryEmbedUrl) {
            // 埋め込みプレイヤーを取得していないので何も表示しない
            return (<p></p>);
        } else if (this.props.demo.isTryEmbedUrl && !this.props.demo.embedUrl) {
            // 埋め込みプレイヤーの取得に失敗している
            return (
                <div className="card__failed-container">
                    <p>本サイトではこの音源を視聴できません。下のリンクへアクセスしてください。</p>
                    <h4>Youtubeへのリンク</h4>
                    <a href={demo.url} target="_blank">{demo.url}</a>
                </div>
            );
        } else {
            return (
                <div className="card__youtube-container">
                    <iframe className="card__youtube-player"
                        type="text/html"
                        src={demo.embedUrl}
                        frameborder="0"></iframe>
                </div>
            );
        }
    }
}

