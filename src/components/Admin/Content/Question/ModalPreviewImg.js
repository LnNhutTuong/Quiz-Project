import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalPreviewImg = (props) => {
  const { show, setShow, data } = props;

  const handleClose = () => {
    setShow(false);
  };

  console.log(">>data img: ", data);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="lg"
        className="PreviewImg"
      >
        <img src={data} alt="your-img" />
      </Modal>
    </>
  );
};

export default ModalPreviewImg;
