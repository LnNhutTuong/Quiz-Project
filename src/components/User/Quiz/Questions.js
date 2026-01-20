import _ from "lodash";
import { data } from "react-router-dom";
const Questions = (props) => {
  const { dataQues, index } = props;

  if (_.isEmpty(dataQues)) {
    return <></>;
  }

  const answer = dataQues.answer;

  const handleChoose = (answer, aId, qId) => {
    props.handleChoosen(aId, qId);
  };

  return (
    <>
      <div className="ques-img">
        {dataQues.imageQuestion ? (
          <img
            src={`data: image/jpeg;base64,${dataQues.imageQuestion}`}
            alt="ques-image"
          />
        ) : (
          <></>
        )}
      </div>
      <div className="question">
        Question {index + 1}: {dataQues.questionDescription}
      </div>
      <div className="answers">
        {answer &&
          answer.length > 0 &&
          answer.map((item, index) => {
            return (
              <div className="answer">
                <div
                  key={`${index}-quiz`}
                  className="choose"
                  onClick={() => {
                    handleChoose(
                      String.fromCharCode(64 + item.id),
                      item.id, // id tra loi
                      dataQues.id, // id cau hoi
                    );
                  }}
                  style={{
                    backgroundColor: item.isSelected ? "#3b3bfe" : "",
                    color: item.isSelected ? "white" : "",
                  }}
                >
                  {String.fromCharCode(65 + index)}.
                </div>
                <div className="description">{item.description}</div>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default Questions;
