import { useEffect, useState } from "react";
import TableUser from "./TableQuiz";
import { getAllQuiz } from "../../../../API/services/admin.service";
import { FcPlus } from "react-icons/fc";

import ModalCreateQuiz from "./ModalCreateQuiz";
import ModalEditQuiz from "./ModalEditQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import "../../../../assets/styles/Manage/ManageQuiz.scss";
const ManagerQuiz = (props) => {
  const [listQuiz, setListQuiz] = useState([]);

  //create new quiz
  const [showModalCreateQuiz, setShowModalCreateQuiz] = useState(false);

  //Edit quiz
  const [showModalEditQuiz, setShowModalEditQuiz] = useState(false);

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
            <FcPlus /> Create new user
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
    </div>
  );
};

export default ManagerQuiz;
