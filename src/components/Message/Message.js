import React from "react";
import Alert from "react-bootstrap/Alert";
import {connect} from 'react-redux';
import {shiftMessages} from "../../redux/drop-serializer-actions";

class Message extends React.Component {
    componentDidMount() {
        window.setTimeout(() => {
            this.props.dispatch(shiftMessages());
        }, 5000);
    }

    render() {
        return (
            <Alert variant={this.props.message.type}>{this.props.message.message}</Alert>
        );
    }
}

export default connect()(Message);
