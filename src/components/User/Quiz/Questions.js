import _ from "lodash";
const Questions = (props) => {
  const { dataQues, index } = props;

  if (_.isEmpty(dataQues)) {
    return <></>;
  }

  const answer = dataQues.answer;

  return (
    <>
      <div className="ques-img">
        <img
          src={`data: image/jpeg;base64,${dataQues.imageQuestion}`}
          alt="ques-image"
        />
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
                <div key={`${index}-quiz`} className="choose">
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
