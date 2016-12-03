import * as React from "react"
import HeaderContainer from "../containers/HeaderContainer"
import DrawerContainer from "../containers/DrawerContainer"
import ContentsContainer from "../containers/ContentsContainer"
import FooterContainer from "../containers/FooterContainer"

export interface AppProps extends React.Props<any> {
    onAppLoad?: Function;
    getStartup?: Function;
    getToken?: Function;
}

export class App extends React.Component<AppProps, any> {
    constructor(
        public props: AppProps,
        public context: any
    ) {
        super(props, context);
    }

    /* component lifecycle */
    componentWillMount = () => {
        this.props.onAppLoad();
        this.props.getStartup();
        this.props.getToken();
    }

    // render
    render(): JSX.Element {
        return (
            <div className="m3demo-app mdl-base">
                <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-color--grey-100 mdl-color-text--grey-700">
                    <HeaderContainer />
                    <DrawerContainer />
                    <ContentsContainer />
                    <FooterContainer />
                </div>
            </div>
        );
    }
}
