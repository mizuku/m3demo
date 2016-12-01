import * as React from "react"

import * as Const from "../../constants"
import { Demo } from "../../models/Demo"

const enum MediaPlayerType {
    Audio,
    Video,
}

/**
 * MediaPlayer の Props
 */
export interface MediaPlayerProps {
    demo?: Demo;
    getEmbedUrl?: Function;
}

/**
 * HTML5 標準のプレイヤーを作成する
 */
export class MediaPlayer extends React.Component<MediaPlayerProps, any> {
    constructor(
        public props: MediaPlayerProps,
        public context: any
    ) {
        super(props, context);
    }

    /** props.url が表すファイルのMimeType */
    private mimeType: string;
    /** props.url が表すファイルのプレイヤータイプ */
    private player: MediaPlayerType;

    /**
     * url が表すファイルのMIMETypeとプレイヤータイプを判定し、プレイヤーへ設定します。
     * @param url メディアファイルのURL
     */
    setFileTYpe = (url: string): void => {
        if (url) {
            let ss = url.split(".");
            let ext = ss[ss.length - 1]
            switch (ext) {
                case "mp3":
                    this.mimeType = "audio/mpeg";
                    this.player = MediaPlayerType.Audio;
                    break;
                case "wav":
                    this.mimeType = "audio/wav";
                    this.player = MediaPlayerType.Audio;
                    break;
                case "aif":
                case "aiff":
                    this.mimeType = "audio/aiff";
                    this.player = MediaPlayerType.Audio;
                    break;
                case "mov":
                    this.mimeType = "video/quicktime";
                    this.player = MediaPlayerType.Video;
                    break;
            }
        }
    }

    /* lifecycle event */
    componentWillMount = () => {
    }
    /* lifecycle event */

    /* render */
    render(): JSX.Element {
        this.setFileTYpe(this.props.demo.url);
        switch (this.player) {
            case MediaPlayerType.Audio:
                return (
                    <audio src={this.props.demo.url}
                        className="card__audio-player"
                        type={this.mimeType}
                        preload="none"
                        controls></audio>
                );
            case MediaPlayerType.Video:
                return (
                    <div className="card__video-container">
                        <video src={this.props.demo.url}
                            className="card__video-player"
                            type={this.mimeType}
                            preload="none"
                            controls></video>
                    </div>
                );
            default:
                return (
                    <p>{Const.Message.ERROR_UNDEFINED_TYPE}</p>
                );
        }
    }

    
}

