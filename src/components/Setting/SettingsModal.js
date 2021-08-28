import React from "react";
import Modal from "react-bootstrap/Modal";
import Click from "./Field/Click";
import Columns from "./Field/Columns";
import SubmitterName from "./Field/SubmitterName";
import Vibrate from "./Field/Vibrate";
import Width from "./Field/Width";
import Theme from "./Field/Theme";
import _SettingsReduxConnector from "./_SettingsReduxConnector";

export default _SettingsReduxConnector.connect(function ({showSettings, show, hide}) {
    return (
        <Modal show={showSettings} onHide={e => hide()}>
            <Modal.Header closeButton>
                <Modal.Title>Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SubmitterName property={'submitter_name'} />
                <Width property={'width'} />
                <Columns property={'columns'} />
                <Theme property={'theme'} />
                <Click property={'click'} />
                <Vibrate property={'vibrate'} />
            </Modal.Body>
        </Modal>
    )
});
