import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Drop from "./Drop";
import "./Node.css";
import Storage from "../lib/Storage";
import Button from "react-bootstrap/Button";
import SubmissionsQueue from "../lib/SubmissionsQueue";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Node extends React.Component {
    constructor(props) {
        super(props);

        this.dropRefs = [];
    }

    render() {
        return (
            <div className="Node">
                <div className="DropsContainer">
                    {this.renderDrops()}
                </div>
                <Row>
                    <Col>
                        <Button variant="primary" block onClick={(e) => this.toggleFilter()}>
                            <FontAwesomeIcon icon="filter"/> Toggle Filter
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="success" block onClick={(e) => this.submit()}>
                            <FontAwesomeIcon icon="copy"/> Submit Run
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }

    renderDrops() {
        return this.props.nodeDrops.map((nodeDrop, i) => {
            let drop = this.props.drops.filter(drop => {
                    return drop.uid === nodeDrop.uid;
                }).shift();

            return <Drop key={i}
                         nodeDrop={nodeDrop}
                         drop={drop}
                         ref={input => {
                             this.dropRefs.push(input);
                         }}/>
        });
    }

    clearDrops() {
        this.dropRefs.forEach(drop => {
            drop.setCount(0);
        });
    }

    toggleFilter() {
        this.dropRefs.forEach(drop => {
            drop.toggleFilter();
        });
    }

    submit() {
        let payload = {
            event_uid: this.props.node.event_uid,
            event_node_uid: this.props.node.uid,
            submitter: Storage.getSubmitterName(),
            drops: this.dropRefs.map(drop => {
                return drop.getState();
            })
        };

        SubmissionsQueue.push(payload);
        Storage.clearNodeSession(this.props.node.event_uid, this.props.node.uid);
        this.clearDrops();
    }
}

export default Node;