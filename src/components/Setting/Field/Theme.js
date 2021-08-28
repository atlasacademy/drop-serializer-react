import React from "react";
import Form from "react-bootstrap/Form";
import _SettingFieldReduxConnector from "./_SettingFieldReduxConnector";

const BOOTSWATCH_THEMES = [
    'default',
    'cerulean',
    'cosmo',
    'cyborg',
    'darkly',
    'flatly',
    'journal',
    'litera',
    'lumen',
    'lux',
    'materia',
    'minty',
    'pulse',
    'sandstone',
    'simplex',
    'sketchy',
    'slate',
    'solar',
    'spacelab',
    'superhero',
    'united',
    'yeti',
]

export default _SettingFieldReduxConnector.connect(function ({property, value, update}) {
    return (
        <Form.Group controlId="settingAppTheme">
            <Form.Label>Theme</Form.Label>
            <Form.Control as="select" value={value} onChange={e => update(e.target.value)}>
                {BOOTSWATCH_THEMES.map(theme => (
                    <option key={theme} value={`theme_${theme}`}>{theme}</option>
                ))}
            </Form.Control>
        </Form.Group>
    )
});
