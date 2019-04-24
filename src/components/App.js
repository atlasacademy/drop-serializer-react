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
import Messages from "../lib/Messages";
import Storage from "../lib/Storage";

class App extends Component {
    constructor(props) {
        super(props);

        this.selectEvent = this.selectEvent.bind(this);

        this.state = {
            isLoadingEvents: true,
            isLoadingEvent: false,
            eventsData: [],
            eventData: null,
            selectedEvent: Query.getEvent(),
            width: Storage.getSettings().width
        };

        Storage.onUpdateSettings(() => {
            this.refreshSettings();
        });

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
            <div className={"App " + this.state.width}>
                <div className="AppTitle">
                    <h1>
                        Drop Serializer
                        <small>by <a href="https://discord.gg/TKJmuCR">Atlas Academy</a></small>
                    </h1>
                    <Button variant="primary" className="AppSettingsToggle"
                            onClick={e => this.setting.toggle()}>
                        <FontAwesomeIcon icon="cog"/>
                    </Button>

                    <div className="AppLinks">
                        <a href="https://github.com/atlasacademy/drop-serializer-react"
                           className="text-secondary"
                           target="_blank" rel="noopener noreferrer author">
                            <FontAwesomeIcon icon={['fab', 'github']}/>
                        </a>
                        <a href="https://discord.gg/TKJmuCR"
                           className="text-secondary"
                           target="_blank" rel="noopener noreferrer author">
                            <FontAwesomeIcon icon={['fab', 'discord']}/>
                        </a>
                    </div>
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
        this.setState({
            width: Storage.getSettings().width
        });
    }

    reloadEvent() {
        Messages.push("warning", "Event is outdated. Reloading event.");

        this.setState({
            isLoadingEvent: true,
            eventData: null
        });

        SubmissionsApi.getEvent(this.state.selectedEvent, event => {
            this.setState({
                isLoadingEvent: false,
                eventData: event
            });
        });
    }

    renderEvent() {
        if (!this.state.selectedEvent || !this.state.eventData)
            return;

        return <Event event={this.state.eventData}
                      selected={this.state.selectedEvent}
                      onOutdated={() => {
                          this.reloadEvent();
                      }}/>;
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
