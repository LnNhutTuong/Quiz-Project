import { useEffect, useState } from "react";
import { getQuizByUsers } from "../../API/services/quiz.service";
import "../../assets/styles/Quiz/ListQuiz.scss";
const ListQuiz = (props) => {
  const [arrayQuiz, setArrayQuiz] = useState(``);

  useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = async () => {
    const data = await getQuizByUsers();
    console.log(">>>Total Quiz: ", data.DT);

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
            <div
              key={`${index}-quiz`}
              className="card"
              style={{ width: "18rem" }}
            >
              <img
                src={`data:image/jpeg;base64, ${quiz.image}`}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Card title {index + 1}</h5>
                <p className="card-text">{quiz.description}</p>
                <button className="btn">Start now</button>
              </div>
            </div>
          );
        })}

      {arrayQuiz && arrayQuiz.length === 0 && (
        <div>
          <p>you dont have any thing</p>
        </div>
      )}
    </div>
  );
};

export default ListQuiz;
