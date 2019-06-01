import React from "react";
import {connect} from 'react-redux';
import Message from "./Message";

const mapStateToProps = (state) => {
    let {messages} = state.dropSerializer;

    if (messages === undefined)
        messages = [];

    return {messages};
};

class Messages extends React.Component {
    render() {
        return (
            <div className="Messages">
                {this.props.messages.map(message =>
                    <Message key={message.key} message={message} />
                )}
            </div>
        );
    }
}

export default connect(mapStateToProps)(Messages);
