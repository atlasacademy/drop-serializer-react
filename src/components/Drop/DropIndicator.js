import React from "react";
import _DropReduxConnector from "./_DropReduxConnector";

class DropIndicator extends React.Component {

    render() {
        let isSelected = (
                this.props.selectedDropUid === this.props.nodeDrop.uid
                && this.props.selectedDropQuantity === this.props.nodeDrop.quantity
            ),
            difference = isSelected ? this.props.submissionDrop.count - this.props.selectedDropInitialCount : 0,
            plusOrMinus = difference >= 0 ? "+" : "-",
            indicatorNumber = isSelected ? Math.abs(difference).toString() : "",
            indicator = plusOrMinus + indicatorNumber;

        return (
            <span className="drop-indicator">{indicator}</span>
        )
    }

}

export default _DropReduxConnector.connect(DropIndicator);
