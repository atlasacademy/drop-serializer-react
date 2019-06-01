import React from "react";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index";
import {connect} from 'react-redux';
import {queue} from "../../redux/thunks/submission";

class SubmitButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            delay: 1000,
            disabled: false
        }
    }

    render() {
        return (
            <Button variant="success" block disabled={this.state.disabled} onClick={(e) => this.submit()}>
                <FontAwesomeIcon icon="copy"/> Submit Run
            </Button>
        );
    }

    submit() {
        this.props.dispatch(queue());
        this.setState({disabled: true});
        window.setTimeout(() => {
            this.setState({disabled: false});
        }, this.state.delay);
    }
}

export default connect()(SubmitButton);
