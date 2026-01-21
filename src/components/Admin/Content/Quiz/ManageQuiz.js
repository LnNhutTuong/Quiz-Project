import { useEffect, useState } from "react";
import TableUser from "./TableQuiz";
import { getAllQuiz } from "../../../../API/services/admin.service";
import ModalCreateQuiz from "./ModalCreateQuiz";
import ModalEditQuiz from "./ModalEditQuiz";
const ManagerQuiz = (props) => {
  const [listQuiz, setListQuiz] = useState([]);

  //create new quiz
  const [showModalCreateQuiz, setShowModalCreateQuiz] = useState(false);

  //Edit quiz
  const [showModalEditQuiz, setShowModalEditQuiz] = useState(false);

  //data view
  const [dataView, setDataView] = useState(``);

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
        <TableUser
          listQuiz={listQuiz}
          setListQuiz={setListQuiz}
          handleViewQuiz={handleViewQuiz}
        />
      </div>
      <ModalCreateQuiz
        show={showModalCreateQuiz}
        setShow={setShowModalCreateQuiz}
      />
      <ModalEditQuiz
        show={showModalEditQuiz}
        setShow={setShowModalEditQuiz}
        dataView={dataView}
        setDataView={setDataView}
      />
    </div>
  );
};

export default ManagerQuiz;
