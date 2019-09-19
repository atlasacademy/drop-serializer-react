import React from "react";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index";
import _DropIncrementor from "./_DropIncrementor";
import _DropIncrementorReduxConnector from "./_DropIncrementorReduxConnector";

class DropBonusDecrement extends _DropIncrementor {

    constructor(props) {
        super(props, {
            max: 100,
            step: -25
        });
    }

    render() {
        return (
            <Button variant="primary" block size="sm" tabIndex="-1"
                    onMouseDown={(e) => this.onMouseDown(e)}
                    onMouseMove={(e) => this.onMouseMove(e)}
                    onMouseOut={(e) => this.onMouseOut(e)}
                    onMouseUp={(e) => this.onMouseUp(e)}>
                <FontAwesomeIcon icon="minus"/>
            </Button>
        );
    }
}

export default _DropIncrementorReduxConnector.connect(DropBonusDecrement);
