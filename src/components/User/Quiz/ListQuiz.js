import { useEffect, useState } from "react";
import { getQuizByUsers } from "../../../API/services/quiz.service";
import "../../../assets/styles/Quiz/ListQuiz.scss";
import { useNavigate } from "react-router-dom";

const ListQuiz = (props) => {
  const [arrayQuiz, setArrayQuiz] = useState(``);
  const navigate = new useNavigate();
  const handleClick = (id, title) => {
    navigate(`/quiz/${id}`, { state: { quiztitle: { title } } });
  };

  useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = async () => {
    const data = await getQuizByUsers();
    console.log(">>>check data: ", data);
    if (data && data.EC === 0) {
      setArrayQuiz(data.DT);
    }
  };

  return (
    <div className="list-quiz-container">
      {arrayQuiz &&
        arrayQuiz.length > 0 &&
        arrayQuiz.map((quiz, index) => {
          return (
            <div key={`${index}-quiz`}>
              <div className="card m-2" style={{ width: "19rem" }}>
                <img
                  src={`data:image/jpeg;base64, ${quiz.image}`}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">Quiz {index + 1}</h5>
                  <p className="card-text">{quiz.description}</p>
                  <button
                    className="btn"
                    onClick={() => {
                      handleClick(quiz.id, quiz.description);
                    }}
                  >
                    Start now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ListQuiz;
