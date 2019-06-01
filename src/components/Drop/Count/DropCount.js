import React from "react";
import Form from "react-bootstrap/Form";
import _DropReduxConnector from "../_DropReduxConnector";

class DropCount extends React.Component {

    render() {
        return (
            <Form.Control type="text"
                          className="drop-input"
                          value={this.props.submissionDrop.count}
                          onChange={(e) => this.onChange(e)}
                          size="sm"/>
        );
    }

    onChange(e) {
        let value = parseInt(e.target.value);

        if (isNaN(value))
            value = 0;
        else if (value < 0)
            value = 0;

        this.props.update(value, false);
    }
}

export default _DropReduxConnector.connect(DropCount);
