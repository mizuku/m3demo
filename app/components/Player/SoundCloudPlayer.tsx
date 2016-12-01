import * as React from "react"

import * as Const from "../../constants"
import { Demo } from "../../models/Demo"

/**
 * SoundCloudPlayer の Props
 */
export interface SoundCloudPlayerProps {
    demo?: Demo;
    getEmbedUrl?: Function;
}

/**
 * SoundCloud HTML埋め込みプレイヤーを作成する
 */
export class SoundCloudPlayer extends React.Component<SoundCloudPlayerProps, any> {
    constructor(
        public props: SoundCloudPlayerProps,
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
            return (<span></span>);
        } else if (this.props.demo.isTryEmbedUrl && !this.props.demo.embedUrl) {
            // 埋め込みプレイヤーの取得に失敗している
            return (
                <div className="card__failed-container">
                    <p>本サイトではこの音源を視聴できません。下のリンクへアクセスしてください。</p>
                    <h4>SoundCloudへのリンク</h4>
                    <a href={demo.url} target="_blank">{demo.url}</a>
                </div>
            );
        } else {
            return (
                <iframe
                    src={demo.embedUrl}
                    className="card__sound-cloud-player"
                    scrolling="no"
                    frameborder="no"
                    >
                    </iframe>
            );
        }
    }
}
