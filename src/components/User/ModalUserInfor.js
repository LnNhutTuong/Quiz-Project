import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import _ from "lodash";

const ModalUserInfor = (props) => {
  const { show, setShow, dataUser } = props;

  const handleClose = (reset = true) => {
    setShow(false);
  };

  const [email, setEmail] = useState(``);
  const [username, setUsername] = useState(``);
  const [role, setRole] = useState(`USER`);
  const [image, setImage] = useState(``);
  const [previewimg, setPreviewimg] = useState(``);

  const [isDisable, setIsDisable] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!_.isEmpty(dataUser)) {
      setEmail(dataUser.email);
      setUsername(dataUser.username);
      setRole(dataUser.role);
      setImage("");
      if (dataUser.image) {
        setPreviewimg(`data:image/jpeg;base64,${dataUser.image}`);
      } else {
        setPreviewimg("");
      }
    }
  }, [dataUser]);

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
  };

  return (
    <div className="modal-edituser">
      <Modal
        show={show}
        onHide={handleClose}
        size="s"
        backdrop="static"
        className="modal-addnewuser"
      >
        <Modal.Header closeButton>
          <Modal.Title>Trang cá nhân</Modal.Title>
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
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                disabled={isDisable}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                onChange={(event) => setRole(event.target.value)}
                value={role}
                disabled={isDisable}
              >
                <option value="USER">User</option>
                <option selected value="ADMIN">
                  Admin
                </option>
              </select>
            </div>
            <div className="col-md-12">
              <label
                className="form-label label-upload"
                htmlFor="labelUpload"
                style={{ cursor: isDisable ? "not-allowed" : "pointer" }}
              >
                <FcPlus /> Upload your image
              </label>
              <input
                type="file"
                id="labelUpload"
                hidden
                disabled={isDisable}
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
          {!isEditing && (
            <div className="btn-edit-delete">
              <Button
                className="btn-warning "
                variant="primary"
                onClick={() => {
                  setIsEditing(true);
                  setIsDisable(false);
                }}
              >
                Change password
              </Button>
              <Button
                className="btn-danger"
                variant="primary"
                onClick={() => {
                  props.handleBtnDeleteUser(dataUser.id, email);
                  handleClose(false);
                }}
              >
                Edit
              </Button>
            </div>
          )}

          {isEditing && (
            <div className="btn-back-savechange">
              <Button
                variant="primary"
                onClick={() => {
                  {
                    setIsEditing(false);
                    setIsDisable(true);
                  }
                }}
              >
                Back
              </Button>

              <Button
                className="btn-success"
                variant="primary"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Save Changes
              </Button>
            </div>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalUserInfor;
