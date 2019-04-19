import React, {Component} from 'react';
import Alert from "react-bootstrap/Alert";
import "./Alerts.css";
import Messages from "../lib/Messages";

class Alerts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            alerts: []
        };

        this.push = this.push.bind(this);
        Messages.registerListener(this.push);
    }

    render() {
        let alerts = this.state.alerts.map((alert, key) => {
            return <Alert key={key} variant={alert.type}>{alert.message}</Alert>;
        });

        return (
            <div className="Alerts">
                {alerts}
            </div>
        );
    }

    push(type, message) {
        let alerts = JSON.parse(JSON.stringify(this.state.alerts));

        alerts.push({
            type: type,
            message: message
        });

        this.setState({
            alerts: alerts
        });

        setTimeout(() => {
            this.shiftAlerts();
        }, 5000);
    }

    shiftAlerts() {
        let alerts = JSON.parse(JSON.stringify(this.state.alerts));

        this.setState({
            alerts: alerts.slice(1)
        });
    }
}

export default Alerts;
