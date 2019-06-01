import React from "react";
import Form from "react-bootstrap/Form";
import _SettingFieldReduxConnector from "./_SettingFieldReduxConnector";

export default _SettingFieldReduxConnector.connect(function ({property, value, update}) {
    return (
        <Form.Group controlId="settingPlayClick">
            <Form.Label>Play Click</Form.Label>
            <Form.Control as="select" value={value ? "Yes" : "No"}
                          onChange={e => update(e.target.value === "Yes")}>
                <option>Yes</option>
                <option>No</option>
            </Form.Control>
        </Form.Group>
    )
});
