import React from "react";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index";
import {connect} from 'react-redux';
import {queue} from "../../redux/thunks/submission";

const mapStateToProps = (state) => {
    const drops = state.dropSerializer.eventData.drops,
        dropCounts = state.dropSerializer.submissionDrops.map(submissionDrop => {
            if (submissionDrop.ignored)
                return 0;

            let drop = drops.filter(drop => drop.uid === submissionDrop.uid).shift();
            if (drop && drop.type === 'Bonus Rate-Up')
                return 0;

            return submissionDrop.count;
        }),
        dropCount = dropCounts.reduce((a, b) => a + b, 0);

    return {dropCount};
};

class SubmitButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            delay: 1000,
            disabled: false,
            timeout: null
        }
    }

    componentWillUnmount() {
        if (!this.state.timeout)
            return;

        window.clearTimeout(this.state.timeout);
        this.setState({timeout: null});
    }

    render() {
        return (
            <Button variant="success" block disabled={this.state.disabled} onClick={(e) => this.submit()}>
                <img className="chest-icon" src="assets/chest.png"/> {this.props.dropCount}
                &nbsp;
                -
                &nbsp;
                <FontAwesomeIcon icon="copy"/> Submit Run
            </Button>
        );
    }

    submit() {
        this.props.dispatch(queue());
        this.setState({
            disabled: true,
            timeout: window.setTimeout(() => {
                this.setState({disabled: false, timeout: null});
            }, this.state.delay)
        });
    }
}

export default connect(mapStateToProps)(SubmitButton);
