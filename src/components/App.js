import React, {Component} from 'react';
import Alerts from "./Alerts";
import Button from "react-bootstrap/Button";
import Event from "./Event";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/Form";
import Query from "../lib/Query";
import Setting from "./Setting";
import SubmissionsApi from "../lib/SubmissionsApi";
import './App.css';
import SubmissionsQueue from "../lib/SubmissionsQueue";

class App extends Component {
    constructor(props) {
        super(props);

        this.selectEvent = this.selectEvent.bind(this);

        this.state = {
            isLoadingEvents: true,
            isLoadingEvent: false,
            eventsData: [],
            eventData: null,
            selectedEvent: Query.getEvent()
        };

        SubmissionsApi.getEvents(events => {
            this.setState({
                isLoadingEvents: false,
                isLoadingEvent: this.state.selectedEvent.length > 0,
                eventsData: events
            });

            if (this.state.selectedEvent.length > 0) {
                SubmissionsApi.getEvent(this.state.selectedEvent, event => {
                    this.setState({
                        isLoadingEvent: false,
                        eventData: event
                    });
                });
            }
        });

        SubmissionsQueue.scheduleNext(true);
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

                <Alerts/>
                {this.renderEventSelector()}
                {this.renderEvent()}
                {this.renderSettings()}
                {this.renderLoading()}
            </div>
        );
    }

    refreshSettings() {

    }

    renderEvent() {
        if (!this.state.selectedEvent || !this.state.eventData)
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

    renderLoading() {
        if (this.state.isLoadingEvents || this.state.isLoadingEvent)
            return (
                <div className="AppLoading">
                    <div className="AppLoadingContent">
                        <FontAwesomeIcon icon="spinner" spin/>
                    </div>
                </div>
            );
    }

    renderSettings() {
        return (
            <Setting ref={(input) => {
                this.setting = input;
            }} onChange={() => {
                this.refreshSettings();
            }}/>
        );
    }

    selectEvent(event) {
        let uid = event.target.value;

        Query.setEvent(uid);
        this.setState({
            isLoadingEvent: false,
            eventData: null,
            selectedEvent: uid
        });

        if (!uid)
            return;

        this.setState({
            isLoadingEvent: true
        });

        SubmissionsApi.getEvent(uid, event => {
            this.setState({
                isLoadingEvent: false,
                eventData: event
            });
        })
    }
}

export default App;
