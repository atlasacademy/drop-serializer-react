import React from 'react';
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Storage from "../lib/Storage";

class Setting extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
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
                                      onChange={e => this.setSubmitterName(e.target.value)}/>
                    </Form.Group>
                </Modal.Body>
            </Modal>
        )
    }

    handleClose() {
        this.setState({ show: false });
    }

    setSubmitterName(name) {
        Storage.setSubmitterName(name);
        this.setState({
            "submitter_name": Storage.getSubmitterName()
        });
    }

    toggle() {
        this.setState({
            show: !this.state.show
        });
    }
}

export default Setting;
