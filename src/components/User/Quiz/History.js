import { getHistory } from "../../../API/services/user.service";
import { useEffect } from "react";
import "../../../assets/styles/Quiz/ListQuiz.scss";

const History = (props) => {
  useEffect(() => {
    history();
  }, []);

  const history = async () => {
    const res = await getHistory();

    console.log(">>>check res: ", res);
  };

  return (
    <div className="list-quiz-container">
      {/* {arrayQuiz &&
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
        })} */}
    </div>
  );
};

export default History;
