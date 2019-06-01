import React from "react";
import Form from "react-bootstrap/Form";
import _SettingFieldReduxConnector from "./_SettingFieldReduxConnector";

export default _SettingFieldReduxConnector.connect(function ({property, value, update}) {
    return (
        <Form.Group controlId="settingNumberOfColumns">
            <Form.Label>Number of Columns</Form.Label>
            <Form.Control as="select"
                          value={value}
                          onChange={e => update(e.target.value)}>
                <option value="columns_auto">Auto</option>
                <option value="columns_2">2</option>
                <option value="columns_4">4</option>
                <option value="columns_6">6</option>
                <option value="columns_8">8</option>
                <option value="columns_12">12</option>
                <option value="columns_16">16</option>
            </Form.Control>
        </Form.Group>
    )
});
