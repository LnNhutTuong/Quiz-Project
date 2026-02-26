import { getHistory } from "../../../API/services/user.service";
import { useEffect, useState } from "react";

import "../../../assets/styles/Quiz/ListQuiz.scss";

import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";

const History = (props) => {
  const [arrayHistory, setArrayHistory] = useState(``);

  useEffect(() => {
    history();
  }, []);

  const history = async () => {
    const res = await getHistory();
    if (res && res.EC === 0) {
      setArrayHistory(res.DT.data);
      toast.success("Đây là lịch sử của bạn");
      console.log(">>>check res: ", res);
    } else {
      toast.success("Đừng bỏ cuộc!");
    }
  };

  console.log(">>>check array: ", arrayHistory);

  return (
    <div className="history-container">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Quiz Name</th>
            <th>Total Correct</th>
            <th>Total Question</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {arrayHistory &&
            arrayHistory.length > 0 &&
            arrayHistory.map((quiz, index) => (
              <tr key={`${index}-quiz`}>
                <td>{quiz.quizHistory.id}</td>
                <td>{quiz.quizHistory.name}</td>
                <td>{quiz.total_correct}</td>
                <td>{quiz.total_questions}</td>
                <td>{new Date(quiz.createdAt).toLocaleString("vi-VN")}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default History;
