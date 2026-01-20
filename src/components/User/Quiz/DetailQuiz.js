import { useEffect, useState } from "react";
import { useParams, useLocation, data } from "react-router-dom";
import {
  getDataQuiz,
  postSubmitQuiz,
} from "../../../API/services/quiz.service";
import "../../../assets/styles/Quiz/DetailQuiz.scss";
import _ from "lodash";
import Questions from "./Questions";
import ModalResult from "./ModalResult";
const DetailQuiz = (props) => {
  const params = new useParams();
  const location = useLocation();

  const quizId = params.id;

  const [dataQues, setDataQues] = useState([]);
  const [index, setIndex] = useState(0);

  const [isShowModalResult, setIsShowModalResult] = useState(false);
  const [dataRessult, setDataResult] = useState({});
  const fetchQuestion = async () => {
    const res = await getDataQuiz(quizId);

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
  }, [quizId]);

  const handlePrev = () => {
    if (index - 1 < 0) return;
    setIndex(index - 1);
  };

  const handleNext = () => {
    if (dataQues && dataQues.length > index + 1) setIndex(index + 1);
  };

  const handleFinish = async () => {
    //Khai bao theo Backend
    let payload = {
      quizId: +quizId,
      answers: [],
    };

    // tao 1 mang the than
    let answer = [];

    if (dataQues && dataQues.length > 0) {
      dataQues.forEach((item) => {
        let questionId = +item.id;
        let userAnswerId = [];

        item.answer.forEach((a) => {
          if (a && a.isSelected) {
            userAnswerId.push(a.id);
          }
        });

        answer.push({
          questionId: +questionId,
          userAnswerId,
        });
      });

      payload.answers = answer;

      //submit api
      let res = await postSubmitQuiz(payload);
      console.log("res: ", res);
      if (res && res.EC === 0) {
        setDataResult({
          countCorrect: res.DT.countCorrect,
          countTotal: res.DT.countTotal,
          quizData: res.DT.quizData,
        });
        setIsShowModalResult(true);
      } else {
        alert("Something went wrong...");
      }
    }
  };

  return (
    <div className="detail-quiz-container container">
      <div className="left-content">
        <div className="title">
          Quiz {quizId}: {location?.state?.quiztitle?.title}
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
      <ModalResult
        show={isShowModalResult}
        setShow={setIsShowModalResult}
        dataRessult={dataRessult}
      />
    </div>
  );
};

export default DetailQuiz;
