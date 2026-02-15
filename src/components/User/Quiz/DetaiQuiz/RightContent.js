import {
  getDataQuiz,
  postSubmitQuiz,
} from "../../../../API/services/quiz.service";
import { useParams, useLocation, data } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import ModalResult from "../ModalResult";

import _ from "lodash";

const RightContent = (props) => {
  const { dataQues, setDataQues, indexA, setIndexA } = props;

  const params = new useParams();
  const quizId = params.id;

  const refDiv = useRef([]);

  const [count, setCount] = useState(300);
  const [dataRessult, setDataResult] = useState({});
  const [isShowModalResult, setIsShowModalResult] = useState(false);

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

  const handleFinish = async () => {
    let payload = {
      quizId: +quizId,
      answers: [],
    };

    // tao 1 mang nhung cau tra loi theo tung cau hoi
    // theo Backend
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

  useEffect(() => {
    fetchQuestion();
  }, [quizId]);

  useEffect(() => {
    if (count === 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [count]);

  const toHHMMSS = (secs) => {
    var sec_num = parseInt(secs, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor(sec_num / 60) % 60;
    var seconds = sec_num % 60;

    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  };

  const onTimeUp = () => {
    handleFinish();
  };

  const getClassQuestion = (question, index) => {
    if (question && question.answer.length > 0) {
      let isAnswer = question.answer.find((a) => a.isSelected === true);
      if (isAnswer) {
        return "question selected";
      }
    }
    return "question";
  };

  const handleClickQuestion = (question, index) => {
    setIndexA(index);
    if (refDiv.current) {
      refDiv.current.forEach((item) => {
        if (item && item.className === "question clicked") {
          item.className = "question";
        }
      });
    }

    if (question && question.answer.length > 0) {
      let isAnswer = question.answer.find((a) => a.isSelected === true);
      if (isAnswer) {
        return "question selectedAclicked";
      }
    }

    refDiv.current[index].className = "question clicked";
  };

  return (
    <div className="right-content-Container">
      <div className="count-down" onTimeUp={onTimeUp}>
        {toHHMMSS(count)}
      </div>
      <div className="main-question">
        {dataQues &&
          dataQues.length > 0 &&
          dataQues.map((question, index) => {
            return (
              <div
                className={getClassQuestion(question, index)}
                onClick={() => {
                  handleClickQuestion(question, index);
                }}
                key={question.id}
                ref={(el) => (refDiv.current[index] = el)}
              >
                {index + 1}
              </div>
            );
          })}
      </div>
      <ModalResult
        show={isShowModalResult}
        setShow={setIsShowModalResult}
        dataRessult={dataRessult}
      />
    </div>
  );
};

export default RightContent;
