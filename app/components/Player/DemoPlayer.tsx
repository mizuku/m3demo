import * as React from "react"

import * as Const from "../../constants"
import { Demo } from "../../models/Demo"
import { YoutubePlayer } from "./YoutubePlayer"
import { NiconicoPlayer } from "./NiconicoPlayer"
import { SoundCloudPlayer } from "./SoundCloudPlayer"
import { MediaPlayer } from "./MediaPlayer"

/**
 * DemoPlayer の Props
 */
export interface DemoPlayerProps {
    demo?: Demo;
    getEmbedUrl?: Function;
}

/**
 * 試聴音源プレイヤーのコンテナ
 */
export class DemoPlayer extends React.Component<DemoPlayerProps, any> {
    constructor(
        public props:DemoPlayerProps,
        public context:any
    ) {
        super(props, context);
    }

    /* render */
    render(): JSX.Element {
        switch (this.props.demo.playerType) {
            case Const.Domain.PLAYER_YOUTUBE:
                return (
                    <YoutubePlayer demo={this.props.demo}
                        getEmbedUrl={this.props.getEmbedUrl}
                        />
                );
            case Const.Domain.PLAYER_NICONICO:
                return (
                    <NiconicoPlayer demo={this.props.demo}
                        getEmbedUrl={this.props.getEmbedUrl}
                        />
                );
            case Const.Domain.PLAYER_SOUNDCLOUD:
                return (
                    <SoundCloudPlayer demo={this.props.demo}
                        getEmbedUrl={this.props.getEmbedUrl}
                        />
                );
            case Const.Domain.PLAYER_NATIVE:
                return (
                    <MediaPlayer demo={this.props.demo}
                        getEmbedUrl={this.props.getEmbedUrl}
                        />
                );
            default:
                return (
                    <p>{Const.Message.ERROR_UNDEFINED_TYPE}</p>
                );
        }
    }
}

