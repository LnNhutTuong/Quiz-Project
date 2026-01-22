import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteUser } from "../../../API/services/admin.service";

const ModalDeleteUser = (props) => {
  const { show, setShow, datadelete, currentPage, setShowModalEdit } = props;

  console.log(">>>>id:", datadelete.userId);
  console.log(">>>>email: ", datadelete.userEmail);

  const handleClose = () => {
    setShow(false);
  };

  const handleBack = () => {
    props.setShowModalEdit(true);
    handleClose();
  };

  const handleSubmidDelete = async () => {
    let data = await deleteUser(datadelete.userId);

    if (data && data.EC == 0) {
      toast.success("Delete success!");
      handleClose();
      await props.fetchListUserPaginate(currentPage);
    }
    if (data && data.EC !== 0) {
      toast.error("Delete fail!");
    }
  };
  return (
    <>
      {/* <Button variant="primary" onClick={setShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Delete this user?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this user: <br />
          <b>{datadelete.userEmail}</b>
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

export default ModalDeleteUser;
