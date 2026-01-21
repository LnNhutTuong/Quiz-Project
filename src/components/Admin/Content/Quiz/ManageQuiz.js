import TableUser from "./TableUser";

const ManagerQuiz = (props) => {
  return (
    <div className="managequiz-container">
      <div className="title">Manage Quiz</div>
      <div className="button-add">
        <div className="btn btn-">Add new quiz</div>
      </div>
      <div className="content">
        <TableUser />
      </div>
    </div>
  );
};

export default ManagerQuiz;
