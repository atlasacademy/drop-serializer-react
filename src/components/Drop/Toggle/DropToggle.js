import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index";
import _DropReduxConnector from "../_DropReduxConnector";

class DropToggle extends React.Component {

    render() {
        if (!this.props.showFilters)
            return null;

        return (
            <div className="drop-toggle" onClick={(e) => this.onClick(e)}>
                <FontAwesomeIcon className="drop-toggle-icon"
                                 icon={this.props.submissionDrop.ignored ? "ban" : "check"}/>
            </div>
        );
    }

    onClick(e) {
        this.props.update(0, !this.props.submissionDrop.ignored);
    }
}

export default _DropReduxConnector.connect(DropToggle);
