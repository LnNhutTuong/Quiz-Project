import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FloatingLabel } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { CiWarning } from "react-icons/ci";

import { postChangePassword } from "../../API/services/auth.service";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ModalChangePass = (props) => {
  const { show, setShow } = props;

  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [reNewPass, setReNewPass] = useState("");

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {}, []);

  const handleClose = () => setShow(false);

  const handleSubmit = async () => {
    //Validate

    if (!currentPass) {
      toast.error("Không được bỏ trống mật khẩu hiện tại");
      return;
    }

    if (!newPass) {
      toast.error("Không được bỏ trống mật khẩu mới");
      return;
    }

    if (newPass.length < 6) {
      toast.error("mật khẩu mới phải từ 6 ký tự");
      return;
    }

    if (newPass.trim === "") {
      toast.error("mật khẩu mới không được có khoảng cách");
      return;
    }

    if (!reNewPass) {
      toast.error("Vui lòng nhập lại mật khẩu");
      return;
    }

    if (newPass != reNewPass) {
      toast.error("Không trùng mật khẩu mới");
      return;
    }

    if (newPass === currentPass) {
      toast.error("Mật khẩu mới trùng với mật khẩu hiện tại");
      return;
    }

    //API
    const res = await postChangePassword(currentPass, newPass);
    if (res && res.EC === 0) {
      toast.success("Đổi mật khẩu thành công!");
    } else {
      toast.error("Sai mật khẩu hiện tại");
    }
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
            onChange={(event) => setCurrentPass(event.target.value)}
          >
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingPassword"
            label="Mật khẩu mới"
            className="mb-2"
            onChange={(event) => setNewPass(event.target.value)}
          >
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingPassword"
            label="Nhập lại mật khẩu mới"
            onChange={(event) => setReNewPass(event.target.value)}
          >
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmit();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalChangePass;
