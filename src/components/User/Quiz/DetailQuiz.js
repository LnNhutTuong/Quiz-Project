import { useEffect, useState } from "react";
import { useParams, useLocation, data } from "react-router-dom";
import { getDataQuiz } from "../../../API/services/quiz.service";
import "../../../assets/styles/Quiz/DetailQuiz.scss";
import _ from "lodash";
import Questions from "./Questions";
const DetailQuiz = (props) => {
  const params = new useParams();
  const location = useLocation();

  const id = params.id;

  const [dataQues, setDataQues] = useState([]);
  const [index, setIndex] = useState(0);

  const fetchQuestion = async () => {
    const res = await getDataQuiz(id);

    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        .groupBy("id")
        .map((value, key) => {
          let answer = [];
          let questionDescription,
            imageQuestion = null;
          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              imageQuestion = item.image;
            }
            item.answers.isSelected = false;
            answer.push(item.answers);
          });

          return { id: key, answer, questionDescription, imageQuestion };
        })
        .value();
      setDataQues(data);
    }
  };

  const handleChoosen = (answerId, quesId) => {
    let dataQuesClone = _.cloneDeep(dataQues);
    let question = dataQuesClone.find((item) => +item.id === +quesId);

    //update answer to question
    if (question && question.answer) {
      let ans = question.answer;
      ans.forEach((item) => {
        item.isSelected = false;
      });
      const selected = ans.find((item) => +item.id === +answerId);
      if (selected) selected.isSelected = true;
    }

    let index = dataQuesClone.findIndex((item) => +item.id === +quesId);
    if (index > -1) {
      dataQuesClone[index] = question;
      setDataQues(dataQuesClone);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  const handlePrev = () => {
    if (index - 1 < 0) return;
    setIndex(index - 1);
  };

  const handleNext = () => {
    if (dataQues && dataQues.length > index + 1) setIndex(index + 1);
  };

  const handleFinish = () => {
    let payload = {
      id: +id,
      answer: [],
    };
    let answer = [];
    if (dataQues && dataQues.length > 0) {
      dataQues.forEach((item) => {
        let questionId = item.id;
        let userAnswer = [];

        item.answer.forEach((a) => {
          if (a && a.isSelected) {
            userAnswer.push(a.id);
          }
        });
        answer.push({
          questionId,
          userAnswer,
        });
      });

      payload.answer = answer;
      console.log("finish: ", payload);
    }
  };

  return (
    <div className="detail-quiz-container container">
      <div className="left-content">
        <div className="title">
          Quiz {id}: {location?.state?.quiztitle?.title}
        </div>
        <hr />
        <div className="question-content">
          <Questions
            index={index}
            dataQues={dataQues && dataQues.length > 0 ? dataQues[index] : []}
            handleChoosen={handleChoosen}
          />
        </div>

        <div className="question-footer">
          <button
            className="btn-prev"
            onClick={() => {
              handlePrev();
            }}
          >
            Prev
          </button>
          <button
            className="btn-next"
            onClick={() => {
              handleNext();
            }}
          >
            Next
          </button>

          <button
            className="btn-finish"
            onClick={() => {
              handleFinish();
            }}
          >
            Finish
          </button>
        </div>
      </div>

      <div className="right-content">count down</div>
    </div>
  );
};

export default DetailQuiz;
