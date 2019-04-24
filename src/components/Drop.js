import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Storage from "../lib/Storage";
import "./Drop.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class Drop extends React.Component {
    constructor(props) {
        super(props);

        this.increment = {
            interval: 250,
            intervalSkips: 3,
            iterator: 0,
            pointerLeash: 10,
            pointerX: null,
            pointerY: null,
            running: false,
            timer: null,
            windowLeash: 10,
            windowListener: null,
            windowPosition: null
        };

        let sessionDrop = Storage.getSessionNodeDrop(
            props.nodeDrop.event_uid,
            props.nodeDrop.event_node_uid,
            props.nodeDrop.uid,
            props.nodeDrop.quantity
        );

        sessionDrop.showFilter = false;
        sessionDrop.active = false;
        sessionDrop.columns = Storage.getSettings().columns;

        this.state = sessionDrop;

        Storage.onUpdateSettings(() => {
            this.refreshSettings();
        });
    }

    render() {
        let columns = " " + this.state.columns,
            ignored = this.state.ignored ? " ignored" : "",
            showFilter = this.state.showFilter ? " showFilter" : "",
            active = this.state.active ? " active" : "",
            DropIcon = (
                <img className="DropIcon" draggable="false"
                     src={this.props.drop.image}
                     alt={this.props.drop.name}
                     onMouseDown={(e) => this.startIncrement(e, 1)}
                     onMouseMove={(e) => this.checkMouseMove(e)}
                     onMouseOut={(e) => this.stopIncrement()}
                     onMouseUp={(e) => this.doMouseUp(1)}/>
            ),
            DropIndicator = <span className="DropIndicator">+</span>,
            DropQuantity = (
                this.props.nodeDrop.quantity > 1
                    ? <span className="DropQuantity">{this.props.nodeDrop.quantity}</span>
                    : ""
            ),
            DropInput = (
                <Form.Control type="text"
                              className="DropInput form-control form-control-sm"
                              value={this.state.count}
                              onChange={(e) => this.changeCount(e)}/>
            ),
            DropDecrement = (
                <Button variant="primary" block size="sm"
                        className="DropDecrement"
                        onMouseDown={(e) => this.startIncrement(e, -1)}
                        onMouseMove={(e) => this.checkMouseMove(e)}
                        onMouseOut={(e) => this.stopIncrement()}
                        onMouseUp={(e) => this.doMouseUp(-1)}>
                    <FontAwesomeIcon icon="minus"/>
                </Button>
            ),
            DropToggle = (
                <div className="DropToggle" onClick={(e) => this.toggleIgnored()}>
                    <FontAwesomeIcon className="DropToggleIcon"
                                     icon={this.state.ignored ? "ban" : "check"}/>
                </div>
            );

        return (
            <div className={"Drop" + columns + ignored + showFilter + active}>
                <div className="DropBorder">
                    <div className="DropContent">
                        <div className="DropIconBox">
                            {DropIcon}
                            {DropIndicator}
                            {DropQuantity}
                        </div>
                        {DropInput}
                        {DropDecrement}
                    </div>
                    {DropToggle}
                </div>
            </div>
        );
    }

    changeCount(event) {
        this.setCount(event.target.value);
    }

    checkMouseMove(e) {
        if (!this.increment.running)
            return;

        let x = e.clientX,
            y = e.clientY,
            w = Math.abs(x - this.increment.pointerX),
            h = Math.abs(y - this.increment.pointerY);

        if (w > this.increment.pointerLeash || h > this.increment.pointerLeash)
            this.stopIncrement();
    }

    clear() {
        this.setCount(0);
    }

    doIncrement(amount) {
        this.setCount(0 + this.state.count + amount);

        this.setState({active: true});
        setTimeout(() => {
            this.setState({active: false});
        }, 50);

        if (this.props.onClick)
            this.props.onClick();
    }

    doMouseUp(amount) {
        if (!this.increment.running)
            return;

        if (this.increment.iterator <= this.increment.intervalSkips)
            this.doIncrement(amount);

        this.stopIncrement();
    }

    getState() {
        return {
            uid: this.state.uid,
            quantity: this.state.quantity,
            count: this.state.count,
            ignored: this.state.ignored
        };
    }

    refreshSettings() {
        this.setState({
            columns: Storage.getSettings().columns
        });
    }

    setCount(value) {
        if (typeof value === "string" && value !== "")
            value = parseInt(value);
        if (isNaN(value) || value < 0)
            value = 0;

        Storage.setSessionNodeDrop(
            this.props.nodeDrop.event_uid,
            this.props.nodeDrop.event_node_uid,
            this.props.nodeDrop.uid,
            this.props.nodeDrop.quantity,
            value,
            this.state.ignored
        );

        this.setState(Storage.getSessionNodeDrop(
            this.props.nodeDrop.event_uid,
            this.props.nodeDrop.event_node_uid,
            this.props.nodeDrop.uid,
            this.props.nodeDrop.quantity
        ));
    }

    startIncrement(e, amount) {
        this.stopIncrement();

        let t = this;
        this.increment.iterator = 0;
        this.increment.pointerX = e.clientX;
        this.increment.pointerY = e.clientY;

        this.increment.timer = setInterval(function () {
            if (t.increment.iterator > t.increment.intervalSkips)
                t.doIncrement(amount);

            t.increment.iterator++;
        }, this.increment.interval);
        this.increment.windowPosition = window.scrollY;
        this.increment.windowListener = function (e) {
            let diff = Math.abs(window.scrollY - t.increment.windowPosition);

            if (diff > t.increment.windowLeash)
                t.stopIncrement();
        };
        window.addEventListener("scroll", this.increment.windowListener);
        this.increment.running = true;
    }

    stopIncrement() {
        if (!this.increment.running)
            return;

        clearInterval(this.increment.timer);
        window.removeEventListener("scroll", this.increment.windowListener);
        this.increment.timer = null;
        this.increment.windowListener = null;
        this.increment.running = false;
    }

    toggleFilter() {
        this.setState({
            showFilter: !this.state.showFilter
        });
    }

    toggleIgnored() {
        Storage.setSessionNodeDrop(
            this.props.nodeDrop.event_uid,
            this.props.nodeDrop.event_node_uid,
            this.props.nodeDrop.uid,
            this.props.nodeDrop.quantity,
            0,
            !this.state.ignored
        );

        this.setState(Storage.getSessionNodeDrop(
            this.props.nodeDrop.event_uid,
            this.props.nodeDrop.event_node_uid,
            this.props.nodeDrop.uid,
            this.props.nodeDrop.quantity
        ));
    }
}

export default Drop;