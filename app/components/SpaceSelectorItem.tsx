import * as React from "react"

export interface SpaceSelectorItemProps {
    spaceInitials?: string;
    isChecked?: boolean;
    changeChecked?: Function;
}

export class SpaceSelectorItem extends React.Component<SpaceSelectorItemProps,any> {
    constructor(
        public props: SpaceSelectorItemProps,
        public context: any
    ) {
        super(props, context);
    }

    /**
     * 項目の選択状態を変更する
     */
    protected switchChecked = (ev: React.FormEvent) => {
        this.props.changeChecked(this.props.spaceInitials, !this.props.isChecked);
    }

    /* render */
    render(): JSX.Element {
        return (
            <li className="mdl-list__item">
                <span className="mdl-list__item-primary-content">
                    {this.props.spaceInitials}
                </span>
                <span className="mdl-list__item-secondary-action">
                    <label className="mdl-switch mdl-js-switch mdl-js-ripple-effect mdl-switch--accent"
                        htmlFor={`space-switch-${this.props.spaceInitials}`}>
                        <input type="checkbox" id={`space-switch-${this.props.spaceInitials}`}
                            className="mdl-switch__input"
                            checked={this.props.isChecked}
                            onChange={this.switchChecked} />
                    </label>
                </span>
            </li>
        );
    }
}
