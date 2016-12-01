import * as React from "react"
import { Demo } from "../models/Demo"
import { DemoNote } from "./DemoNote"

export interface DemoListProps {
    eventId?: number;
    demos?: { demo: Demo, isFavorite: boolean }[];
    getEmbedUrl?: Function;
    changeFavorite?: Function;
}

export class DemoList extends React.Component<DemoListProps, any> {
    constructor(
        public props:DemoListProps,
        public context:any
    ) {
        super(props, context);
    }

    /**
     * パラメータにイベントID付きでお気に入り変更する
     */
    changeFavoriteWithEventId = (demo: Demo, isFavorite: boolean): void => {
        this.props.changeFavorite(this.props.eventId, demo, isFavorite);
    }

    /* component lifecycle */
    componentDidUpdate = () => {
        let list = this.refs["$demo-list"];
        if (list instanceof HTMLElement) {
            // MDL Component Upgrade
            let componentHandler = (window as any).componentHandler as MaterialDesignLite.ComponentHandler;
            componentHandler.upgradeElements(list);
        }
    }

    /* render */
    render(): JSX.Element {
        var demoNodes = this.props.demos.map((v) => {
            return (
                <DemoNote key={`${this.props.eventId}${v.demo.space}${v.demo.id.toString()}`}
                    demo={v.demo}
                    isFavorite={v.isFavorite}
                    getEmbedUrl={this.props.getEmbedUrl}
                    changeFavorite={this.changeFavoriteWithEventId}
                    />
            );
        });
        return (
            <article ref="$demo-list">
                {demoNodes}
            </article>
        );
    }
}

