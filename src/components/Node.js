import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Drop from "./Drop";
import "./Node.css";
import Storage from "../lib/Storage";
import Button from "react-bootstrap/Button";

class Node extends React.Component {
    constructor(props) {
        super(props);

        this.dropRefs = [];
    }

    render() {
        return (
            <div className="Node">
                <Button variant="success" block onClick={(e) => this.submit()}>
                    <FontAwesomeIcon icon="copy"/> Submit Run
                </Button>
                <div className="DropsContainer">
                    {this.renderDrops()}
                </div>
                <Button variant="success" block onClick={(e) => this.submit()}>
                    <FontAwesomeIcon icon="copy"/> Submit Run
                </Button>
                <Button variant="danger" block>
                    <FontAwesomeIcon icon="trash-alt"/> Reset Current Run
                </Button>
            </div>
        );
    }

    renderDrops() {
        return this.props.nodeDrops.map((nodeDrop, i) => {
            let drop = this.props.drops.filter(drop => {
                    return drop.uid === nodeDrop.uid;
                }).shift();

            return <Drop key={i}
                         nodeDrop={nodeDrop} drop={drop}
                         ref={input => {
                             this.dropRefs.push(input);
                         }}/>
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

        Storage.queueSubmission(payload);
        Storage.clearNodeSession(this.props.node.event_uid, this.props.node.uid);
        this.dropRefs.forEach(drop => {
            drop.setCount(0);
        });
    }
}

export default Node;