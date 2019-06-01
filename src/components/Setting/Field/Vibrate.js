import React from "react";
import Form from "react-bootstrap/Form";
import _SettingFieldReduxConnector from "./_SettingFieldReduxConnector";

export default _SettingFieldReduxConnector.connect(function ({property, value, update}) {
    return (
        <Form.Group controlId="settingVibrate">
            <Form.Label>Vibrate</Form.Label>
            <Form.Control as="select"
                          value={value ? "Yes" : "No"}
                          disabled={!window.navigator.vibrate}
                          onChange={e => update(e.target.value === "Yes")}>
                <option>Yes</option>
                <option>No</option>
            </Form.Control>
        </Form.Group>
    )
});
