import { useEffect, useState } from "react";
import { getQuizByUsers } from "../../services/apiServices";

const ListQuiz = (props) => {
  const [arrayQuiz, setArrayQuiz] = useState(``);

  useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = async () => {
    const data = await getQuizByUsers();
    console.log(">>>check data user: ", data);

    if (data && data.EC === 0) {
      setArrayQuiz(data.DT);
    }
  };

  return (
    <div className="quiz-container">
      {arrayQuiz && arrayQuiz.length > 0 ? (
        arrayQuiz.map((quiz, index) => {
          <div
            key={`${index}-quiz`}
            className="card"
            style={{ width: "18rem" }}
          >
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Card title {index + 1}</h5>
              <p className="card-text">{quiz.description}</p>
              <button>Start now</button>
            </div>
          </div>;
        })
      ) : (
        <div>You don't have anything</div>
      )}
    </div>
  );
};

export default ListQuiz;
