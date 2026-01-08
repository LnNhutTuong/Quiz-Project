import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import axios from "axios";
import { ToastContainer, toast, Flip } from "react-toastify";
import { putUpdateUser } from "../../../services/apiServices";
import _ from "lodash";

const ModalViewUser = (props) => {
  const { show, setShow, dataupdate, currentPage } = props;

  // const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setImage("");
    setPreviewimg("");

    props.setDataUpdate();
  };

  // const handleShow = () => setShow(true);

  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const [username, setUsername] = useState(``);
  const [role, setRole] = useState(`USER`);
  const [image, setImage] = useState(``);
  const [previewimg, setPreviewimg] = useState(``);

  useEffect(() => {
    if (!_.isEmpty(dataupdate)) {
      setEmail(dataupdate.email);

      setUsername(dataupdate.username);
      setRole(dataupdate.role);
      setImage("");
      if (dataupdate.image) {
        setPreviewimg(`data:image/jpeg;base64,${dataupdate.image}`);
      } else {
        setPreviewimg("");
      }
    }
  }, [dataupdate]);

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewimg(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    } else {
      setPreviewimg(``);
    }
  };

  const handleSubmit = async () => {
    //validate

    if (!username) {
      toast.error("Invalid username");
      return;
    }

    let data = await putUpdateUser(dataupdate.id, username, role, image);

    if (data && data.EC == 0) {
      toast.success("Update a new user success!");
      handleClose();
      await props.fetchListUserPaginate(currentPage);
    }
    if (data && data.EC !== 0) {
      toast.error("Update a new user fail!");
    }
  };

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Add new user
      </Button> */}

      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-addnewuser"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                disabled
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                disabled
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                onChange={(event) => setRole(event.target.value)}
                value={role}
              >
                <option value="USER">User</option>
                <option selected value="ADMIN">
                  Admin
                </option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label label-upload" htmlFor="labelUpload">
                <FcPlus /> Upload your image
              </label>
              <input
                type="file"
                id="labelUpload"
                hidden
                onChange={(event) => handleUploadImage(event)}
              />
            </div>
            <div className="cold-md-12 img-review">
              {previewimg ? (
                <img src={previewimg} alt="your-img" />
              ) : (
                <span>Preview image</span>
              )}
            </div>
          </form>
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

export default ModalViewUser;
