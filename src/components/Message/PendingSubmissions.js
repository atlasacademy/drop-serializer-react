import React from "react";
import Alert from "react-bootstrap/Alert";
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    let {submissionQueue} = state.dropSerializer,
        pendingCount = submissionQueue === undefined ? 0 : submissionQueue.length;

    return {pendingCount};
};

class PendingSubmissions extends React.Component {
    render() {
        if (this.props.pendingCount === 0)
            return null;

        return (
            <Alert variant='warning'>{this.props.pendingCount} pending submission(s).</Alert>
        );
    }
}

export default connect(mapStateToProps)(PendingSubmissions);
