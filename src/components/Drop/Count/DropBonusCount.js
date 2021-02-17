import React from "react";
import Form from "react-bootstrap/Form";
import _DropReduxConnector from "../_DropReduxConnector";

class DropBonusCount extends React.Component {

    render() {
        return (
            <Form.Control as="select"
                          className="drop-input"
                          value={this.props.submissionDrop.count}
                          onChange={(e) => this.props.update(parseInt(e.target.value), false)}
                          size="sm">
                {[...Array(11).keys()].map(i =>
                    <option key={i} value={i * 10}>{i * 10}%</option>
                )}
            </Form.Control>
        );
    }
}

export default _DropReduxConnector.connect(DropBonusCount);
