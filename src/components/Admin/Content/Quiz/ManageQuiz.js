import { useState } from "react";
import TableUser from "./TableQuiz";
import ModalCreateQuiz from "./ModalCreateQuiz";
const ManagerQuiz = (props) => {
  //create new quiz
  const [showModalCreateQuiz, setShowModalCreateQuiz] = useState(false);

  return (
    <div className="managequiz-container">
      <div className="title">Manage Quiz</div>
      <div className="button-add">
        <div
          className="btn btn-primary"
          onClick={() => {
            setShowModalCreateQuiz(true);
          }}
        >
          Create new quiz
        </div>
      </div>
      <div className="content">
        <TableUser />
      </div>
      <ModalCreateQuiz
        show={showModalCreateQuiz}
        setShow={setShowModalCreateQuiz}
      />
    </div>
  );
};

export default ManagerQuiz;
