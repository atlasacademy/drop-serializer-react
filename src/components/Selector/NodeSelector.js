import React from "react";
import Form from "react-bootstrap/Form";
import {connect} from 'react-redux';
import {selectNode} from "../../redux/thunks/select";

const mapStateToProps = (state) => {
    return {
        nodeList: state.dropSerializer.eventData.nodes,
        selectedNode: state.dropSerializer.selectedNode
    };
};

class NodeSelector extends React.Component {

    render() {
        return (
            <Form.Control as="select"
                          className="event-selector"
                          onChange={e => {
                              this.updateNode(e)
                          }}
                          value={this.props.selectedNode}>
                {
                    [
                        <option key={0} value={""}>Select a node</option>
                    ].concat(this.props.nodeList.map((node, i) =>
                        <option key={i + 1} value={node.uid}>{node.name}</option>
                    ))
                }
            </Form.Control>
        );
    }

    updateNode(event) {
        this.props.dispatch(selectNode(event.target.value));
    }

}

export default connect(mapStateToProps)(NodeSelector);
