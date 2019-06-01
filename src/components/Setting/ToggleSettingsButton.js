import React from "react";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index";
import _SettingsReduxConnector from "./_SettingsReduxConnector";

export default _SettingsReduxConnector.connect(function ({showSettings, show, hide}) {
    return (
        <Button variant="primary" className="settings" onClick={e => show(e)}>
            <FontAwesomeIcon icon="cog"/>
        </Button>
    )
});
