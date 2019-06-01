import React from "react";
import {connect} from 'react-redux';
import Drop from './Drop';
import DropBonus from "./DropBonus";

const mapStateToProps = (state) => {
    const {selectedNode} = state.dropSerializer,
        nodeDrops = state.dropSerializer.eventData.node_drops
                         .filter(nodeDrop => nodeDrop.event_node_uid === selectedNode),
        drops = nodeDrops.map(nodeDrop =>
            state.dropSerializer.eventData.drops.filter(drop => drop.uid === nodeDrop.uid).shift()
        );

    return {drops, nodeDrops};
};

class DropContainer extends React.Component {

    render() {
        const makeNodeDropKey = function (nodeDrop) {
            return '' + nodeDrop.event_uid
                + '_' + nodeDrop.event_node_uid
                + '_' + nodeDrop.uid
                + '_' + nodeDrop.quantity;
        };

        return <div className={"drop-container"}>
            {this.props.nodeDrops.map((nodeDrop, i) =>
                this.props.drops[i] && this.props.drops[i].type === "Bonus Rate-Up"
                    ? <DropBonus key={makeNodeDropKey(nodeDrop)} nodeDrop={nodeDrop}/>
                    : <Drop key={makeNodeDropKey(nodeDrop)} nodeDrop={nodeDrop}/>
            )}
        </div>;
    }

}

export default connect(mapStateToProps)(DropContainer);
