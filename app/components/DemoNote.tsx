import * as React from "react"

import { Demo } from "../models/Demo"
import { DemoPlayer } from "./Player/DemoPlayer"

export interface DemoNoteProps {
    key?: string;
    demo?: Demo;
    isFavorite?: boolean;
    getEmbedUrl?: Function;
    changeFavorite?: Function;
}

export class DemoNote extends React.Component<DemoNoteProps, any> {
    constructor(
        public props:DemoNoteProps,
        public context:any
    ) {
        super(props, context);
    }

    /**
     * 埋め込みプレイヤー用URLを取得する。
     */
    getEmbedUrl = () => {
        this.props.getEmbedUrl(this.props.demo);
    }

    /**
     * お気に入りを変更する
     */
    changeFavorite = () => {
        this.props.changeFavorite(this.props.demo, !this.props.isFavorite);
    }

    /* render */
    render(): JSX.Element {
        let icon = this.props.isFavorite ? "star" : "star_border";
        return (
            <section className="card__section mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
                <div className="mdl-card mdl-cell mdl-cell--12-col">
                    <div className="mdl-card__title">
                        <div className="card__circle-space-container mdl-color--primary">
                            <h3 className="card__circle-space-text">{this.props.demo.space}</h3>
                        </div>
                        <div className="card__circle-name">
                            <h3 className="card__circle-name-text">{this.props.demo.circle}</h3>
                        </div>
                    </div>
                    <div className="mdl-card__actions">
                        <DemoPlayer
                            demo={this.props.demo}
                            getEmbedUrl={this.props.getEmbedUrl}
                            />
                    </div>
                    <div className="mdl-card__supporting-text">
                        <span>{this.props.demo.comment}</span>
                    </div>
                    <button className="card__fav-button mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon mdl-button--colored"
                            onClick={this.changeFavorite}>
                        <i className="material-icons star">{icon}</i>
                    </button>
                </div>
            </section>
        );
    }
}

