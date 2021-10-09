import axios from "axios";
import React from "react";
import {Alert, Button, ButtonGroup, ProgressBar} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import {connect} from "react-redux";
import {setShowUpload} from "../../redux/drop-serializer-actions";

const mapStateToProps = (state) => {
    const {domain, selectedEvent, selectedNode, settings, showUpload, eventList, eventData} = state.dropSerializer;
    const selectedEventName = (eventList ?? []).find(e => e.uid === selectedEvent)?.name ?? "";
    const selectedNodeName = eventData?.nodes.find(n => n.uid === selectedNode)?.name ?? "";

    return {
        domain,
        selectedEvent,
        selectedEventName,
        selectedNode,
        selectedNodeName,
        show: showUpload,
        submitter: settings.submitter_name
    };
};

class UploadModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            downloading: false,
            type: "simple",
            files: [],
        };
    }

    addFiles(files) {
        const _files = this.state.files.slice();

        for (let i = 0; i < files.length; i++) {
            _files.push({
                file: files[i],
                completed: false,
                failed: false,
                progress: 0,
            });
        }

        this.setState({
            files: _files
        });
    }

    async download() {
        await this.setState({downloading: true});

        let active = 0;

        for (let i = 0; i < this.state.files.length; i++) {
            const file = this.state.files[i];

            if (file.completed)
                continue;

            active++;
            this.downloadFile(i, file).then(() => {
                active--;
            });

            while (active >= 5) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }

        while (active > 0) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        await this.setState({downloading: false});
    }

    async downloadFile(i, file) {
        const endpoint = this.props.domain + '/submit/screenshot';

        let files = [...this.state.files];

        files[i].failed = false;
        files[i].progress = 0;
        await this.setState({files});

        try {
            const data = new FormData();
            data.append('event_uid', this.props.selectedEvent);
            data.append('event_node_uid', this.props.selectedNode);
            data.append('submitter', this.props.submitter);
            data.append('type', this.state.type);
            data.append('files[]', file.file);

            await axios.post(endpoint, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    files = [...this.state.files];

                    files[i].progress = progressEvent.loaded / progressEvent.total * 100;
                    this.setState({files});
                }
            });

            files = [...this.state.files];
            files[i].completed = true;
            await this.setState({files});
        } catch (e) {
            files = [...this.state.files];
            files[i].failed = true;
            await this.setState({files});
        }

        return true;
    }

    readyToUpload() {
        return !this.state.downloading
            && this.state.files.length > 0
            && this.state.files.filter(file => file.failed).length === 0
            && this.state.files.filter(file => !file.completed && !file.failed).length > 0;
    }

    readyToRetry() {
        return !this.state.downloading
            && this.state.files.length > 0
            && this.state.files.filter(file => file.failed).length > 0;
    }

    isComplete() {
        return !this.state.downloading
            && this.state.files.length > 0
            && this.state.files.filter(file => !file.completed).length === 0;
    }

    reset() {
        this.setState({files: []});
    }

    hide() {
        if (this.state.downloading)
            return;

        this.props.dispatch(setShowUpload(false));
        this.reset();
    }

    render() {
        const isEvent = /^\d+$/.test(this.props.selectedEvent);
        return (
            <Modal show={this.props.show} onHide={() => this.hide()}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!this.state.downloading ? (
                        <Form>
                            {!this.state.files.length ? (
                                <div>
                                    <Alert variant="info">
                                        Uploading to {isEvent ? "event" : ""} <b>{this.props.selectedEventName}</b>{" "}
                                        node <b>{this.props.selectedNodeName}</b>{" "}
                                        as <b>{this.props.submitter}</b>
                                    </Alert>
                                    <Form.Group>
                                        <Form.Label>Type</Form.Label>
                                        <Form.Control as="select"
                                                      value={this.state.type}
                                                      onChange={event => {
                                                          this.setState({type: event.target.value});
                                                      }}>
                                            <option value={"simple"}>Simple</option>
                                            <option value={"full"}>Full</option>
                                        </Form.Control>
                                        <Form.Text>
                                            <ul>
                                                <li>Simple: Only first screen. Currency + QP + Exp are ignored</li>
                                                <li>Full: All drop screens are required for submission to be successful</li>
                                            </ul>
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Files</Form.Label>
                                        <div className="custom-file">
                                            <input type="file"
                                                   className="custom-file-input"
                                                   accept="image/*"
                                                   multiple="multiple"
                                                   onChange={(event) => {
                                                       this.addFiles(event.target.files);
                                                   }}/>
                                            <label className="custom-file-label">Select Files</label>
                                        </div>
                                    </Form.Group>
                                </div>
                            ) : null}
                            {this.readyToUpload() ? (
                                <Form.Group>
                                    <ButtonGroup className="btn-block">
                                        <Button variant="danger" onClick={() => this.reset()}>Reset</Button>
                                        <Button onClick={() => this.download()}>Upload All</Button>
                                    </ButtonGroup>
                                </Form.Group>
                            ) : null}

                            {this.readyToRetry() ? (
                                <Form.Group>
                                    <ButtonGroup className="btn-block">
                                        <Button variant="danger" onClick={() => this.reset()}>Reset</Button>
                                        <Button onClick={() => this.download()}>Retry Failed</Button>
                                    </ButtonGroup>
                                </Form.Group>
                            ) : null}

                            {this.isComplete() ? (
                                <div>
                                    <p>All Complete</p>
                                    <Button block variant="success" onClick={() => this.reset()}>New
                                        Uploads</Button>
                                </div>
                            ) : null}
                        </Form>
                    ) : null}

                    {this.state.files.map((file, i) => {
                        return file.completed ? null : (
                            <div key={i}>
                                <h5>{file.file.name}</h5>
                                {this.state.downloading && !file.failed ? (
                                    <ProgressBar animated striped now={file.progress}/>
                                ) : null}
                                {file.failed ? (
                                    <p className='text-danger'>Failed</p>
                                ) : null}
                                <br/>
                            </div>
                        );
                    })}
                </Modal.Body>
            </Modal>
        );
    }
}

export default connect(mapStateToProps)(UploadModal);
