import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const PreviewModal = ({ isModalShow, handleModalClose }) => {
  return (
    <Modal show={isModalShow} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleModalClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PreviewModal;
