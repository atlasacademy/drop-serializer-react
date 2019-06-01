import React from "react";
import Form from "react-bootstrap/Form";
import {connect} from 'react-redux';
import {selectEvent} from "../../redux/thunks/select";

const mapStateToProps = (state) => {
    return {
        selectedEvent: state.dropSerializer.selectedEvent,
        eventList: state.dropSerializer.eventList
    };
};

class EventSelector extends React.Component {

    render() {
        return (
            <Form.Control as="select"
                          className="event-selector"
                          onChange={e => this.updateEvent(e)}
                          value={this.props.selectedEvent}>
                {
                    [
                        <option key={0} value={""}>Select a event</option>
                    ].concat(this.props.eventList.map((event, i) =>
                        <option key={i + 1} value={event.uid}>{event.name}</option>
                    ))
                }
            </Form.Control>
        );
    }

    updateEvent(event) {
        this.props.dispatch(selectEvent(event.target.value));
    }

}

export default connect(mapStateToProps)(EventSelector);
