import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

import "./ModalCloseButton.css";

const ModalCloseButton = ({ onClick }) => {
    return (
        <button className="modal-close" onClick={onClick}>
            <FontAwesomeIcon icon={faXmark}/>
        </button>
    );
};

export default ModalCloseButton;
