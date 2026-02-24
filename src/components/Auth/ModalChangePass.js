import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FloatingLabel } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { CiWarning } from "react-icons/ci";

import { postChangePassword } from "../../API/services/auth.service";
import { useState, useEffect } from "react";

const ModalChangePass = (props) => {
  const { show, setShow } = props;

  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");

  useEffect(() => {}, []);

  const handleClose = () => setShow(false);

  const handleSubmit = async () => {
    const res = await postChangePassword();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Đổi mật khẩu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CiWarning color="red" size={"2em"} />
          Your password must be at least 6 characters and should include a
          combination of numbers, letters and special characters (!$@%).
          <FloatingLabel
            controlId="floatingPassword"
            label="Mật khẩu hiện tại"
            className="mb-2 mt-2"
          >
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingPassword"
            label="Mật khẩu mới"
            className="mb-2"
          >
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingPassword"
            label="Nhập lại mật khẩu mới"
          >
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalChangePass;
