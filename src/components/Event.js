import unique from "array-unique";
import React from 'react';
import Node from "./Node";
import Query from "../lib/Query";
import "./Event.css";
import Form from "react-bootstrap/Form";

class Event extends React.Component {
    constructor(props) {
        super(props);

        this.selectNode = this.selectNode.bind(this);

        this.nodeKey = 0;
        this.nodeRef = null;
        this.state = this.extractNode(Query.getNode());
    }

    extractNode(uid) {
        let node = this.props.event.nodes.filter(node => {
                return node.uid === uid;
            }).pop(),
            nodeDrops = this.props.event.node_drops.filter(drop => {
                return drop.event_node_uid === uid;
            }).sort(((a, b) => {
                return a.sort - b.sort;
            })),
            dropUids = unique(nodeDrops.map(drop => {
                return drop.uid;
            })),
            drops = this.props.event.drops.filter(drop => {
                return dropUids.indexOf(drop.uid) !== -1;
            });

        return {
            selectedNode: uid,
            node: node,
            nodeDrops: nodeDrops,
            drops: drops
        };
    }

    render() {
        return (
            <div className="Event">
                {this.renderNodeSelector()}
                {this.renderNode()}
            </div>
        );
    }

    renderNode() {
        if (!this.state.selectedNode)
            return;

        return <Node key={this.nodeKey}
                     node={this.state.node}
                     nodeDrops={this.state.nodeDrops}
                     drops={this.state.drops}
                     onOutdated={this.props.onOutdated}
                     ref={input => {
                         this.nodeRef = input;
                     }}/>
    }

    renderNodeSelector() {
        let i = 0,
            options = [
                <option key={i++} value={""}>Select a node</option>
            ].concat(this.props.event.nodes.map(node => {
                return <option key={i++} value={node.uid}>{node.name}</option>
            }));

        return (
            <Form.Control as="select"
                          className="NodeSelector custom-select"
                          onChange={this.selectNode}
                          value={this.state.selectedNode}>
                {options}
            </Form.Control>
        );
    }

    selectNode(event) {
        if (this.nodeRef)
            this.nodeRef.destroy();

        this.nodeKey++;
        let uid = event.target.value;
        Query.setNode(uid);

        this.setState(this.extractNode(uid));
    }
}

export default Event;