import { useEffect, useState } from "react";
import { getQuizByUsers } from "../../../API/services/quiz.service";
import "../../../assets/styles/Quiz/ListQuiz.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
      toast.success("Hãy tiếp tục cố gắng!");
    } else {
      toast.success("Đừng bỏ cuộc!");
    }
  };

  return (
    <div className="list-quiz-container">
      {arrayQuiz &&
        arrayQuiz.length > 0 &&
        arrayQuiz.map((quiz, index) => {
          return (
            <>
              <div key={`${index}-quiz`}>
                <div className="card m-3 quiz-card">
                  <img
                    src={`data:image/jpeg;base64,${quiz.image}`}
                    className="card-img-top quiz-img"
                    alt="..."
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">Quiz {index + 1}</h5>

                    <p className="card-text flex-grow-1 description">
                      {quiz.description}
                    </p>

                    <button
                      className="btn btn-primary mt-auto align-self-start px-4 py-2"
                      onClick={() => handleClick(quiz.id, quiz.description)}
                    >
                      Start now
                    </button>
                  </div>
                </div>
              </div>
            </>
          );
        })}
    </div>
  );
};

export default ListQuiz;
