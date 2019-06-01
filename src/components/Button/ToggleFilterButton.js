import React from "react";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index";
import {connect} from 'react-redux';
import {setShowFilters} from "../../redux/drop-serializer-actions";

const mapStateToProps = (state) => {
    const {showFilters} = state.dropSerializer;

    return {showFilters};
};

class ToggleFilterButton extends React.Component {

    render() {
        return (
            <Button variant="primary" block onClick={(e) => this.onClick(e)}>
                <FontAwesomeIcon icon="filter"/> Toggle Filter
            </Button>
        );
    }

    onClick(e) {
        this.props.dispatch(setShowFilters(!this.props.showFilters));
    }

}

export default connect(mapStateToProps)(ToggleFilterButton);
