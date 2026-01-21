import { useState } from "react";
import TableUser from "./TableUser";
import { useNavigate } from "react-router-dom";

const ManagerQuiz = (props) => {
  const [showModalCreateQuiz, setShowModalCreateQuiz] = useState(false);

  const handleCreateNewQuiz = () => {
    setShowModalCreateQuiz(true);
    alert("show");
  };

  return (
    <div className="managequiz-container">
      <div className="title">Manage Quiz</div>
      <div className="button-add">
        <div
          className="btn btn-primary"
          onClick={() => {
            handleCreateNewQuiz();
          }}
        >
          Create new quiz
        </div>
      </div>
      <div className="content">
        <TableUser
          show={showModalCreateQuiz}
          setShow={setShowModalCreateQuiz}
        />
      </div>
    </div>
  );
};

export default ManagerQuiz;
