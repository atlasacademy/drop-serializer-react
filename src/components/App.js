import React, {Component} from 'react';
import Button from "react-bootstrap/Button";
import Event from "./Event";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/Form";
import Query from "../lib/Query";
import Setting from "./Setting";
import SubmissionsApi from "../lib/SubmissionsApi";
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.selectEvent = this.selectEvent.bind(this);

        this.state = {
            isLoadingEvents: true,
            isLoadingEvent: true,
            eventsData: [],
            eventData: [],
            selectedEvent: Query.getEvent()
        };

        SubmissionsApi.getEvents(events => {
            this.setState({
                isLoadingEvents: false,
                eventsData: events
            });

            if (this.state.selectedEvent) {
                SubmissionsApi.getEvent(this.state.selectedEvent, event => {
                    this.setState({
                        isLoadingEvent: false,
                        eventData: event
                    });
                });
            }
        });
    }

    render() {
        return (
            <div className="App">
                <div className="AppTitle">
                    <h1>
                        Drop Serializer
                        <small>by <a href="https://discord.gg/TKJmuCR">Atlas Academy</a></small>
                    </h1>
                    <Button variant="info" className="AppSettingsToggle"
                            onClick={e => this.setting.toggle()}>
                        <FontAwesomeIcon icon="cog"/>
                    </Button>
                </div>

                {this.renderEventSelector()}
                {this.renderEvent()}
                <Setting ref={(input) => {
                    this.setting = input;
                }} onChange={() => {
                    this.refreshSettings();
                }}/>
            </div>
        );
    }

    renderEvent() {
        if (this.state.isLoadingEvent || !this.state.selectedEvent)
            return;

        return <Event event={this.state.eventData} selected={this.state.selectedEvent}/>;
    }

    renderEventSelector() {
        if (this.state.isLoadingEvents)
            return;

        let i = 0,
            options = [
                <option key={i++} value={""}>Select a event</option>
            ].concat(this.state.eventsData.map(event => {
                return <option key={i++} value={event.uid}>{event.name}</option>
            }));

        return (
            <Form.Control as="select"
                          className="EventSelector"
                          onChange={this.selectEvent}
                          value={this.state.selectedEvent}>
                {options}
            </Form.Control>
        );
    }

    refreshSettings() {

    }

    selectEvent(event) {
        let uid = event.target.value;

        Query.setEvent(uid);
        this.setState({
            isLoadingEvent: true,
            eventData: null,
            selectedEvent: uid
        });

        if (!uid)
            return;

        SubmissionsApi.getEvent(uid, event => {
            this.setState({
                isLoadingEvent: false,
                eventData: event
            });
        })
    }
}

export default App;
