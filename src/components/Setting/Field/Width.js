import React from "react";
import Form from "react-bootstrap/Form";
import _SettingFieldReduxConnector from "./_SettingFieldReduxConnector";

export default _SettingFieldReduxConnector.connect(function ({property, value, update}) {
    return (
        <Form.Group controlId="settingAppWidth">
            <Form.Label>App Width</Form.Label>
            <Form.Control as="select" value={value} onChange={e => update(e.target.value)}>
                <option value="width_full">Full Width</option>
                <option value="width_480">480px</option>
                <option value="width_720">720px</option>
                <option value="width_1080">1080p</option>
                <option value="width_1200">1200p</option>
                <option value="width_1440">1440p</option>
                <option value="width_2160">2160p</option>
            </Form.Control>
        </Form.Group>
    )
});
