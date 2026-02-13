import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { useState } from "react";
import { postCreateNewQuiz } from "../../../../API/services/admin.service";
import { toast } from "react-toastify";
import "../../../../assets/styles/Manage/ManageQuiz.scss";

const ModalCreateQuiz = (props) => {
  const { show, setShow } = props;

  const [name, setName] = useState(``);
  const [description, setDescription] = useState(``);
  const [difficulty, setDifficulty] = useState(``);
  const [quizImage, setQuizImage] = useState(``);
  const [previewimg, setPreviewimg] = useState(``);

  const handleClose = () => {
    setShow(false);
    setName(``);
    setDescription(``);
    setDifficulty(``);
    setQuizImage(``);
    setPreviewimg(``);
  };

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewimg(URL.createObjectURL(event.target.files[0]));
      setQuizImage(event.target.files[0]);
    } else {
      setPreviewimg(``);
    }
  };

  const handleSubmit = async () => {
    //validate
    if (!name || !description) {
      toast.error("Name/Description is required");
      return;
    }
    if (!quizImage) {
      toast.error("Image is required");
      return;
    }

    const res = await postCreateNewQuiz(
      description,
      name,
      difficulty,
      quizImage,
    );

    if (res && res.EC == 0) {
      toast.success(res.EM);
      handleClose();
      props.fetchAllQuiz();
    }
    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        centered
        className="modal-addnewuser"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create new QUIZ:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6 mt-0">
              <label className="form-label">Name quiz</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </div>
            <div className="col-md-6 mt-0">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Difficult</label>
              <select
                className="form-select"
                value={difficulty}
                onChange={(event) => {
                  setDifficulty(event.target.value);
                }}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option selected value="Hard">
                  Hard
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
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreateQuiz;
