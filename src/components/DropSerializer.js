import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {Col, Row, Button} from "react-bootstrap";
import {connect} from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {init} from '../redux/thunks/load';
import "../sass/drop-serializer.scss";
import SheetButton from "./Button/SheetButton";
import SubmitButton from "./Button/SubmitButton";
import ToggleFilterButton from "./Button/ToggleFilterButton";
import DropContainer from "./Drop/DropContainer";
import Messages from "./Message/Messages";
import EventSelector from "./Selector/EventSelector";
import NodeSelector from "./Selector/NodeSelector";
import Settings from "./Setting/SettingsModal";
import ToggleSettingButton from "./Setting/ToggleSettingsButton";
import UploadButton from "./Upload/UploadButton";
import UploadModal from "./Upload/UploadModal";

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
        const theme = (this.props.settings.theme ?? "theme_default").replace("theme_", "");
        return <HelmetProvider>
        <Helmet>
            {theme === "default" ? null : (
                <link
                    key="theme"
                    rel="stylesheet"
                    href={`https://cdn.jsdelivr.net/npm/bootswatch@4.6.0/dist/${theme}/bootstrap.min.css`}/>
            )}
        </Helmet>
        <div id={"drop-serializer"} className={this.props.settings.width}>
            <div className="title">
                <Row>
                <Col md={12} lg={6}>
                    <h1>
                        Drop Serializer
                        <small> by <a href="https://discord.gg/TKJmuCR">Atlas Academy</a></small>
                    </h1>
                </Col>

                <Col md={12} lg={6}>
                    <div className="links">
                        <UploadButton/>
                        <SheetButton/>
                        <a href="https://github.com/atlasacademy/drop-serializer-react"
                        className="text-secondary"
                        target="_blank" rel="noopener noreferrer author">
                            <Button variant="outline-secondary">
                                <FontAwesomeIcon icon={['fab', 'github']}/>
                            </Button>
                        </a>
                        <a href="https://discord.gg/TKJmuCR"
                        className="text-secondary"
                        target="_blank" rel="noopener noreferrer author">
                            <Button variant="outline-secondary">
                                <FontAwesomeIcon icon={['fab', 'discord']}/>
                            </Button>
                        </a>
                        <ToggleSettingButton/>
                    </div>
                </Col>
                </Row>
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
            <UploadModal/>
            {this.props.isLoading && <div className="loading">
                <div className="loading-content">
                    <FontAwesomeIcon icon="spinner" spin/>
                </div>
            </div>}
            <Messages/>
        </div>
        </HelmetProvider>;
    }

}

export default connect(mapStateToProps)(DropSerializer);
