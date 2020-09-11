import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {connect} from "react-redux";
import {setShowUpload} from "../../redux/drop-serializer-actions";

const mapStateToProps = (state) => {
    const {eventData, eventList, selectedNode, showUpload} = state.dropSerializer,
        eventsLoaded = eventList && eventList.length > 0,
        eventLoaded = eventsLoaded && Boolean(eventData),
        parsable = eventLoaded ? eventData.parsable : false;

    return {eventLoaded, parsable, selectedNode, showUpload};
};

class UploadButton extends React.Component {
    toggle() {
        this.props.dispatch(setShowUpload(!this.props.showUpload));
    }

    render() {
        if (!this.props.eventLoaded || !this.props.parsable || !this.props.selectedNode) {
            return null;
        }

        return (
            <a href=""
               onClick={event => {
                   event.preventDefault();
                   this.toggle();
               }}>
                <FontAwesomeIcon icon="file-upload"/>
            </a>
        );
    }
}

export default connect(mapStateToProps)(UploadButton);
