import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Drop from "./Drop";
import "./Node.css";
import Storage from "../lib/Storage";
import Button from "react-bootstrap/Button";
import SubmissionsQueue from "../lib/SubmissionsQueue";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Howl} from 'howler';
import DropBonus from "./DropBonus";

class Node extends React.Component {
    constructor(props) {
        super(props);

        this.dropRefs = [];
        this.clickSound = new Howl({
            src: "./sounds/click.mp3"
        })
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

            if (drop.type === "Bonus Rate-Up")
                return <DropBonus key={i}
                                  nodeDrop={nodeDrop}
                                  drop={drop}
                                  onClick={() => {
                                      this.notifyClick();
                                  }}
                                  ref={input => {
                                      this.dropRefs.push(input);
                                  }}/>
            else
                return <Drop key={i}
                             nodeDrop={nodeDrop}
                             drop={drop}
                             onClick={() => {
                                 this.notifyClick();
                             }}
                             ref={input => {
                                 this.dropRefs.push(input);
                             }}/>
        });
    }

    clearDrops() {
        this.dropRefs.forEach(drop => {
            drop.clear();
        });
    }

    destroy() {
        this.dropRefs.forEach(drop => {
            drop.destroy();
        });
    }

    notifyClick() {
        if (Storage.getSettings().click)
            this.clickSound.play();

        if (Storage.getSettings().vibrate && window.navigator.vibrate)
            window.navigator.vibrate(100);
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

        SubmissionsQueue.push(payload, () => {
            if (this.props.onOutdated)
                this.props.onOutdated();
        });
        Storage.clearNodeSession(this.props.node.event_uid, this.props.node.uid);
        this.clearDrops();
    }
}

export default Node;