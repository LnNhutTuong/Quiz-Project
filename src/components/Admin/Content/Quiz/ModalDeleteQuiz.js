import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteQuiz } from "../../../../API/services/admin.service";

const ModalDeleteQuiz = (props) => {
  const { show, setShow, datadelete, setShowEdit, fetchAllQuiz } = props;

  const handleClose = () => {
    setShow(false);
  };

  const handleBack = () => {
    setShowEdit(true);
    handleClose();
  };

  const handleSubmidDelete = async () => {
    const res = await deleteQuiz(datadelete.quizId);
    if (res && res.EC == 0) {
      toast.success("Delete success!");
      setShowEdit(false);
      handleClose();
      fetchAllQuiz();
    }
    if (res && res.EC !== 0) {
      toast.error("Delete fail!");
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Delete this user?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this Quiz: <br />
          <b>{datadelete.quizName}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleBack}>
            Back
          </Button>
          <Button variant="primary" onClick={handleSubmidDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

//   const handleSubmidDelete = async () => {
//     let data = await deleteUser(datadelete.userId);

//     if (data && data.EC == 0) {
//       toast.success("Delete success!");
//       handleClose();
//       await props.fetchListUserPaginate(currentPage);
//     }
//     if (data && data.EC !== 0) {
//       toast.error("Delete fail!");
//     }
//   };

export default ModalDeleteQuiz;
