import React from "react";
import _DropIncrementor from "./_DropIncrementor";
import _DropIncrementorReduxConnector from "./_DropIncrementorReduxConnector";

class DropBonusIcon extends _DropIncrementor {
    constructor(props) {
        super(props, {
            max: 100,
            step: 25,
        });
    }

    render() {
        return (
            <img className="drop-icon" draggable="false"
                 src={this.props.drop.image}
                 alt={this.props.drop.name}
                 onMouseDown={(e) => this.onMouseDown(e)}
                 onMouseMove={(e) => this.onMouseMove(e)}
                 onMouseOut={(e) => this.onMouseOut(e)}
                 onMouseUp={(e) => this.onMouseUp(e)}/>
        );
    }
}

export default _DropIncrementorReduxConnector.connect(DropBonusIcon);
