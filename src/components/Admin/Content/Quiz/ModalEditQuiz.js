import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { putUpdateQuiz } from "../../../../API/services/admin.service";
import _ from "lodash";
import { set } from "nprogress";
const ModalEditQuiz = (props) => {
  const {
    show,
    setShow,
    dataView,
    setDataView,
    handleDeleteQuiz,
    fetchAllQuiz,
  } = props;

  //props Quiz
  const [name, setName] = useState(``);
  const [description, setDescription] = useState(``);
  const [difficulty, setDifficulty] = useState(``);
  const [quizImage, setQuizImage] = useState(``);
  const [previewimg, setPreviewimg] = useState(``);
  const [dateCreate, setDateCreate] = useState(``);
  const [dateUpdate, setDateUpdate] = useState(``);

  //
  const [isDisabled, setIsDisabled] = useState(true);

  //
  const [isEditing, setIsEditing] = useState(false);

  //Modal delete
  const [showModalDelete, setShowModalDelete] = useState(false);

  const handleClose = (reset = true) => {
    if (reset) {
      setShow(false);
      setName(``);
      setDescription(``);
      setDifficulty(``);
      setQuizImage(``);
      setPreviewimg(``);
      setDateUpdate(``);
      setDateCreate(``);
      setIsDisabled(true);
      setIsEditing(false);
      setDataView();
      fetchAllQuiz();
    }
  };

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewimg(URL.createObjectURL(event.target.files[0]));
      setQuizImage(event.target.files[0]);
    } else {
      setPreviewimg(``);
    }
  };

  const handleBack = () => {
    setIsDisabled(true);
    setIsEditing(false);
  };
  useEffect(() => {
    if (!_.isEmpty(dataView)) {
      setName(dataView.name);
      setDescription(dataView.description);
      setDifficulty(dataView.difficulty);
      setDateCreate(new Date(dataView.createdAt).toLocaleString("vi-VN"));
      setDateUpdate(new Date(dataView.updatedAt).toLocaleString("vi-VN"));

      setQuizImage("");
      if (dataView.image) {
        setPreviewimg(`data:image/jpeg;base64,${dataView.image}`);
      } else {
        setPreviewimg("");
      }
    }
  }, [dataView]);

  const handleEdit = () => {
    setIsDisabled(false);
    setIsEditing(true);
  };

  const handleSaveChange = async () => {
    if (!name || !description) {
      toast.error("Name/Description is required");
      return;
    }

    const res = await putUpdateQuiz(
      dataView.id,
      description,
      name,
      difficulty,
      quizImage,
    );

    console.log(">>>>RES: ", res);

    if (res && res.EC === 0) {
      toast.success(res.EM);
      setIsEditing(false);
      setIsDisabled(true);
      setDateUpdate(new Date().toLocaleString("vi-vn"));
      await fetchAllQuiz();
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-addnewuser"
      >
        <Modal.Header closeButton>
          <Modal.Title>View detail QUIZ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name quiz</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
                disabled={isDisabled}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
                disabled={isDisabled}
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
                disabled={isDisabled}
              >
                <option value="Easy">Easy</option>
                <option selected value="Hard">
                  Hard
                </option>
              </select>
            </div>
            {/* ------------------------------ */}
            <div
              className="col-md-8 d-flex gap-4"
              style={{ paddingLeft: "195px" }}
            >
              <div className="col-md-auto">
                <label className="form-label">Date create</label>
                <input
                  type="text"
                  className="form-control"
                  value={dateCreate}
                  disabled
                />
              </div>
              <div className="col-md-auto">
                <label className="form-label">Date update</label>
                <input
                  type="text"
                  className="form-control"
                  value={dateUpdate}
                  disabled
                />
              </div>
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
                disabled={isDisabled}
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
          {isEditing ? (
            <>
              <Button variant="warning" onClick={() => handleBack()}>
                Back
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  handleSaveChange();
                }}
              >
                Save change
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="warning"
                onClick={() => {
                  handleEdit();
                }}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  handleDeleteQuiz(dataView.id, name);
                }}
              >
                Delete
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditQuiz;
