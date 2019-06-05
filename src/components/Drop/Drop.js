import React from "react";
import _DropReduxConnector from "./_DropReduxConnector";
import DropCount from "./Count/DropCount";
import DropDecrement from "./Incrementor/DropDecrement";
import DropIcon from "./Incrementor/DropIcon";
import DropToggle from "./Toggle/DropToggle";
import DropIndicator from "./DropIndicator";

class Drop extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            animating: false
        };
    }

    render() {
        if (this.props.submissionDrop.ignored && !this.props.showFilters)
            return null;

        return (
            <div className={"drop " + this.props.settings.columns + (this.state.animating ? " animating" : "")}>
                <div className="drop-border">
                    <div className="drop-content">
                        <div className="drop-icon-box">
                            <DropIcon nodeDrop={this.props.nodeDrop} parent={this}/>
                            <DropIndicator nodeDrop={this.props.nodeDrop}/>
                            <span className="drop-quantity">
                                {this.props.quantityDisplay > 1 ? this.props.quantityDisplay : ""}
                            </span>
                        </div>
                        <DropCount nodeDrop={this.props.nodeDrop}/>
                        <DropDecrement nodeDrop={this.props.nodeDrop} parent={this}/>
                    </div>
                    <DropToggle nodeDrop={this.props.nodeDrop}/>
                </div>
            </div>
        )
    }

    animate() {
        this.setState({animating: true});

        setTimeout(() => this.setState({animating: false}), 1);
    }
}

export default _DropReduxConnector.connect(Drop);
