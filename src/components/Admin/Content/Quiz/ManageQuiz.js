import { useEffect, useState } from "react";
import TableUser from "./TableQuiz";
import { getAllQuiz } from "../../../../API/services/admin.service";
import { FcPlus } from "react-icons/fc";

import ModalCreateQuiz from "./ModalCreateQuiz";
import ModalEditQuiz from "./ModalEditQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdateQaQuiz from "./ModalUpdateQA";
import "../../../../assets/styles/Manage/ManageQuiz.scss";
const ManagerQuiz = (props) => {
  const [listQuiz, setListQuiz] = useState([]);

  //create new quiz
  const [showModalCreateQuiz, setShowModalCreateQuiz] = useState(false);

  //Edit quiz
  const [showModalEditQuiz, setShowModalEditQuiz] = useState(false);

  //Update QA content
  const [showModalUpdateQaQuiz, setShowModalUpdateQaQuiz] = useState(false);
  const [dataQA, setDataQA] = useState(``);
  //data view
  const [dataView, setDataView] = useState(``);

  //data delete
  const [datadelete, setDataDelete] = useState({});
  const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);

  useEffect(() => {
    fetchAllQuiz();
  }, []);

  const fetchAllQuiz = async () => {
    const res = await getAllQuiz();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };

  const handleViewQuiz = (quiz) => {
    setShowModalEditQuiz(true);
    setDataView(quiz);
  };

  const handleViewQaContent = () => {
    setShowModalUpdateQaQuiz(true);
  };

  const handleDeleteQuiz = (quizId, quizName) => {
    setDataDelete({ quizId, quizName });
    setShowModalEditQuiz(false);
    setShowModalDeleteQuiz(true);
  };

  return (
    <div className="managequiz-container">
      <div className="title">Manage Quiz</div>

      <div className="content">
        <div className="btn-create btn btn-dark">
          <div
            onClick={() => {
              setShowModalCreateQuiz(true);
            }}
          >
            <FcPlus /> Create new QUIZ
          </div>
        </div>

        <div className="btn-update-QA-content btn btn-dark">
          <div
            onClick={() => {
              handleViewQaContent();
            }}
          >
            <FcPlus /> Update QA Quiz
          </div>
        </div>

        <div className="table-quiz">
          <TableUser
            listQuiz={listQuiz}
            setListQuiz={setListQuiz}
            handleViewQuiz={handleViewQuiz}
          />
        </div>
      </div>
      <ModalCreateQuiz
        show={showModalCreateQuiz}
        setShow={setShowModalCreateQuiz}
        fetchAllQuiz={fetchAllQuiz}
      />
      <ModalEditQuiz
        show={showModalEditQuiz}
        setShow={setShowModalEditQuiz}
        dataView={dataView}
        setDataView={setDataView}
        handleDeleteQuiz={handleDeleteQuiz}
        fetchAllQuiz={fetchAllQuiz}
      />
      <ModalDeleteQuiz
        show={showModalDeleteQuiz}
        setShow={setShowModalDeleteQuiz}
        datadelete={datadelete}
        setDataDelete={setDataDelete}
        setShowEdit={setShowModalEditQuiz}
        fetchAllQuiz={fetchAllQuiz}
      />
      <ModalUpdateQaQuiz
        show={showModalUpdateQaQuiz}
        setShow={setShowModalUpdateQaQuiz}
        dataQA={dataQA}
        setDataQA={setDataQA}
      />
    </div>
  );
};

export default ManagerQuiz;
