import React from 'react';
import Drop from './Drop';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class DropBonus extends Drop {

    render() {
        let DropIcon = (
                <img className="DropIcon" draggable="false"
                     src={this.props.drop.image}
                     alt={this.props.drop.name}
                     onMouseDown={(e) => this.startIncrement(e, 1)}
                     onMouseMove={(e) => this.checkMouseMove(e)}
                     onMouseOut={(e) => this.stopIncrement()}
                     onMouseUp={(e) => this.doMouseUp(1)}/>
            ),
            DropIndicator = <span className="DropIndicator">BONUS</span>,
            DropInput = (
                <Form.Control as="select"
                              size="sm"
                              className="DropInput"
                              value={this.state.count}
                              onChange={(e) => this.changeCount(e)}>
                    <option>0</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                    <option>60</option>
                    <option>70</option>
                    <option>80</option>
                    <option>90</option>
                    <option>100</option>
                </Form.Control>
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
            <div className="Drop">
                <div className="DropBorder">
                    <div className="DropContent">
                        <div className="DropIconBox">
                            {DropIcon}
                            {DropIndicator}
                        </div>
                        {DropInput}
                        {DropDecrement}
                    </div>
                    {DropToggle}
                </div>
            </div>
        );
    }

    clear() {
        // Do Nothing
    }

    doIncrement(amount) {
        var result = 0 + this.state.count + (amount * 10);

        if (result > 100)
            result = 100;

        this.setCount(result);

        this.setState({active: true});
        setTimeout(() => {
            this.setState({active: false});
        }, 50);

        if (this.props.onClick)
            this.props.onClick();
    }

}

export default DropBonus;
