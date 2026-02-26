import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LeftContent from "./LeftContent";
import RightContent from "./RightContent";

import "../../../../assets/styles/Quiz/DetailQuiz.scss";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const MainDetailQuiz = () => {
  const navigate = useNavigate();

  const [dataQues, setDataQues] = useState([]);
  const [indexA, setIndexA] = useState(0);

  const [show, setShow] = useState(false);
  const [isFinish, setIsFinish] = useState(false);

  const handleClose = () => setShow(false);

  const handleBack = () => {
    if (isFinish) {
      navigate("/user");
    } else {
      setShow(true);
    }
  };

  return (
    <div className="detail-quiz-container container">
      <div className="top">
        <button
          className="btn btn-light"
          onClick={() => {
            handleBack();
          }}
        >
          back
        </button>
      </div>
      <div className="bottom">
        <div className="left-content">
          <LeftContent
            dataQues={dataQues}
            setDataQues={setDataQues}
            indexA={indexA}
            setIndexA={setIndexA}
            isFinish={isFinish}
            setIsFinish={setIsFinish}
          />
        </div>

        <div className="right-content">
          <RightContent
            dataQues={dataQues}
            setDataQues={setDataQues}
            indexA={indexA}
            setIndexA={setIndexA}
          />
        </div>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Trở về trang chủ ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bài làm của bạn vẫn chưa hoàn thành, nếu ấn "Đồng ý" thì bài làm sẽ
          kết thúc và lưu vào lịch sử làm bài của bạn đấy!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Nồ nô
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              navigate("/user");
            }}
          >
            Đồng ý
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MainDetailQuiz;
