import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteUser } from "../../../API/services/admin.service";

const ModalResult = (props) => {
  const { show, setShow, dataRessult } = props;

  console.log("check data: ", dataRessult);
  const handleClose = () => {
    setShow(false);
  };

  const handleShowAnswers = () => {
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Your Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Body>Total question : {dataRessult.countTotal}</Modal.Body>
          <Modal.Body>
            Total correct answers: {dataRessult.countCorrect}
          </Modal.Body>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShowAnswers}>
            Show answers
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResult;
