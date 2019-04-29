import React from 'react';
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Storage from "../lib/Storage";

class Setting extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: !Storage.getSubmitterName(),
            settings: Storage.getSettings(),
            submitter_name: Storage.getSubmitterName()
        };
    }

    render() {
        return (
            <Modal show={this.state.show} onHide={e => this.handleClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="settingSubmitterName">
                        <Form.Label>Submitter Name</Form.Label>
                        <Form.Control value={this.state.submitter_name}
                                      onChange={e => this.setSubmitterName(e.target.value)}
                                      ref={(input) => {
                                          this.submitterInput = input;
                                      }}/>
                    </Form.Group>

                    <Form.Group controlId="settingAppWidth">
                        <Form.Label>App Width</Form.Label>
                        <Form.Control as="select"
                                      value={this.state.settings.width}
                                      onChange={e => this.setAppWidth(e.target.value)}>
                            <option value="width_full">Full Width</option>
                            <option value="width_480">480px</option>
                            <option value="width_720">720px</option>
                            <option value="width_1080">1080p</option>
                            <option value="width_2160">2160p</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="settingNumberOfColumns">
                        <Form.Label>Number of Columns</Form.Label>
                        <Form.Control as="select"
                                      value={this.state.settings.columns}
                                      onChange={e => this.setNumberOfColumns(e.target.value)}>
                            <option value="columns_auto">Auto</option>
                            <option value="columns_2">2</option>
                            <option value="columns_4">4</option>
                            <option value="columns_6">6</option>
                            <option value="columns_8">8</option>
                            <option value="columns_12">12</option>
                            <option value="columns_16">16</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="settingPlayClick">
                        <Form.Label>Play Click</Form.Label>
                        <Form.Control as="select"
                                      value={this.state.settings.click ? "Yes" : "No"}
                                      onChange={e => this.setPlayClick(e.target.value)}>
                            <option>Yes</option>
                            <option>No</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="settingVibrate">
                        <Form.Label>Vibrate</Form.Label>
                        <Form.Control as="select"
                                      value={this.state.settings.vibrate ? "Yes" : "No"}
                                      disabled={!window.navigator.vibrate}
                                      onChange={e => this.setVibrate(e.target.value)}>
                            <option>Yes</option>
                            <option>No</option>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
            </Modal>
        )
    }

    componentDidMount() {
        if (!Storage.getSubmitterName())
            this.submitterInput.focus();
    }

    handleClose() {
        this.setState({show: false});
    }

    setAppWidth(value) {
        Storage.setSettings("width", value);
        this.setState({
            settings: Storage.getSettings()
        });
    }

    setNumberOfColumns(value) {
        Storage.setSettings("columns", value);
        this.setState({
            settings: Storage.getSettings()
        });
    }

    setPlayClick(value) {
        Storage.setSettings("click", value==="Yes");
        this.setState({
            settings: Storage.getSettings()
        });
    }

    setSubmitterName(name) {
        Storage.setSubmitterName(name);
        this.setState({
            "submitter_name": Storage.getSubmitterName()
        });
    }

    setVibrate(value) {
        Storage.setSettings("vibrate", value==="Yes");
        this.setState({
            settings: Storage.getSettings()
        });
    }

    toggle() {
        this.setState({
            show: !this.state.show
        });
    }
}

export default Setting;
