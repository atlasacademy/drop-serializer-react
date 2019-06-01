import React from "react";
import Form from "react-bootstrap/Form";
import _SettingFieldReduxConnector from "./_SettingFieldReduxConnector";

export default _SettingFieldReduxConnector.connect(function ({property, value, update}) {
    return (
        <Form.Group controlId="settingSubmitterName">
            <Form.Label>Submitter Name</Form.Label>
            <Form.Control value={value} onChange={e => update(e.target.value)}/>
        </Form.Group>
    )
});
