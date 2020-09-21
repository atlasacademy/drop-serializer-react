import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index";
import {connect} from 'react-redux';
import {Button} from "react-bootstrap";

const mapStateToProps = (state) => {
    const {eventData, eventList} = state.dropSerializer,
        eventsLoaded = eventList && eventList.length > 0,
        eventLoaded = eventsLoaded && Boolean(eventData),
        sheetId = eventLoaded ? eventData.sheet_id : '',
        sheetLink = 'https://docs.google.com/spreadsheets/d/' + sheetId;

    return {eventLoaded, sheetLink};
};

class SheetButton extends React.Component {
    render() {
        if (!this.props.eventLoaded) {
            return null;
        }

        return (
            <a href={this.props.sheetLink}
               className="text-success"
               target="_blank" rel="noopener noreferrer author">
                <Button variant="outline-success">
                    <FontAwesomeIcon icon="file-excel"/>
                </Button>
            </a>
        );
    }
}

export default connect(mapStateToProps)(SheetButton);
