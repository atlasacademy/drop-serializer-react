import React from "react";
import _DropReduxConnector from "./_DropReduxConnector";
import DropBonusCount from "./Count/DropBonusCount";
import DropBonusIcon from "./Incrementor/DropBonusIcon";
import DropBonusDecrement from "./Incrementor/DropBonusDecrement";

class DropBonus extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            animating: false
        };
    }

    render() {
        return (
            <div className={"drop drop-bonus " + this.props.settings.columns + (this.state.animating ? " animating" : "")}>
                <div className="drop-border">
                    <div className="drop-content">
                        <div className="drop-icon-box">
                            <DropBonusIcon nodeDrop={this.props.nodeDrop} parent={this}/>
                            <span className="drop-indicator">Bonus</span>
                        </div>
                        <DropBonusCount nodeDrop={this.props.nodeDrop}/>
                        <DropBonusDecrement nodeDrop={this.props.nodeDrop} parent={this}/>
                    </div>
                </div>
            </div>
        )
    }

    animate() {
        this.setState({animating: true});

        setTimeout(() => this.setState({animating: false}), 1);
    }
}

export default _DropReduxConnector.connect(DropBonus);
