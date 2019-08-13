import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {connect} from 'react-redux';
import {init} from '../redux/thunks/load';
import "../sass/drop-serializer.scss";
import Messages from "./Message/Messages";
import Settings from "./Setting/SettingsModal";
import ToggleSettingButton from "./Setting/ToggleSettingsButton";
import DropContainer from "./Drop/DropContainer";
import EventSelector from "./Selector/EventSelector";
import NodeSelector from "./Selector/NodeSelector";
import ToggleFilterButton from "./Button/ToggleFilterButton";
import SubmitButton from "./Button/SubmitButton";
import SheetButton from "./Button/SheetButton";

const mapStateToProps = (state, ownProps) => {
    const {eventData, eventList, isLoading, selectedEvent, selectedNode, settings} = state.dropSerializer,
        {options} = ownProps,
        eventsLoaded = eventList && eventList.length > 0,
        eventLoaded = eventsLoaded && Boolean(eventData),
        nodeSelected = !isLoading && eventLoaded && Boolean(selectedEvent) && Boolean(selectedNode);

    return {eventsLoaded, eventLoaded, isLoading, nodeSelected, options, settings};
};

class DropSerializer extends React.Component {

    componentDidMount() {
        this.props.dispatch(init(this.props.options));
    }

    render() {
        return <div id={"drop-serializer"} className={this.props.settings.width}>
            <div className="title">
                <h1>
                    Drop Serializer
                    <small>by <a href="https://discord.gg/TKJmuCR">Atlas Academy</a></small>
                </h1>

                <ToggleSettingButton/>

                <div className="links">
                    <SheetButton/>
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
            {this.props.eventsLoaded && <EventSelector/>}
            {this.props.eventLoaded && <NodeSelector/>}
            {this.props.nodeSelected &&
            <div>
                <DropContainer/>
                <Row>
                    <Col>
                        <ToggleFilterButton/>
                    </Col>
                    <Col>
                        <SubmitButton/>
                    </Col>
                </Row>
            </div>
            }
            <Settings/>
            {this.props.isLoading && <div className="loading">
                <div className="loading-content">
                    <FontAwesomeIcon icon="spinner" spin/>
                </div>
            </div>}
            <Messages/>
        </div>;
    }

}

export default connect(mapStateToProps)(DropSerializer);
