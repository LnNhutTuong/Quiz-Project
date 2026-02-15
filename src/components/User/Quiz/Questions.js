import _ from "lodash";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";

import { useState } from "react";

const Questions = (props) => {
  const { dataQues, indexA } = props;

  const [open, setOpen] = useState({ open: false, src: "", title: "" });
  const [isPreview, setIsPreview] = useState(false);

  if (_.isEmpty(dataQues)) {
    return <></>;
  }

  const answer = dataQues.answer;

  const handleChoose = (answer, aId, qId) => {
    props.handleChoosen(aId, qId);
  };

  // console.log(">>>check data: ", dataQues);|
  return (
    <>
      <div className="ques-img">
        {dataQues.imageQuestion ? (
          <img
            src={`data: image/jpeg;base64,${dataQues.imageQuestion}`}
            alt="ques-image"
            onClick={(e) => {
              e.preventDefault();
              setOpen({
                open: true,
                src: `data: image/jpeg;base64,${dataQues.imageQuestion}`,
                title: dataQues.questionDescription,
              });
            }}
          />
        ) : (
          <></>
        )}
      </div>
      <div className="question">
        Question {indexA + 1}: {dataQues.questionDescription}
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
      <Lightbox
        open={open.open}
        close={() => setOpen({ ...open, open: false })}
        plugins={[Captions]}
        slides={[
          {
            src: open.src,
            title: open.title,
          },
        ]}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
      />
    </>
  );
};
export default Questions;
