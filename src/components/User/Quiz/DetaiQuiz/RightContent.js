import { getDataQuiz } from "../../../../API/services/quiz.service";
import { useParams, useLocation, data } from "react-router-dom";
import { useEffect, useState } from "react";

import _ from "lodash";

const RightContent = () => {
  const params = new useParams();
  const location = useLocation();

  const [dataQues, setDataQues] = useState([]);

  const quizId = params.id;

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

  useEffect(() => {
    fetchQuestion();
  }, [quizId]);

  return (
    <div className="right-content-Container">
      <div className="count-down">10:00</div>
      <div className="main-question">
        {dataQues &&
          dataQues.length > 0 &&
          dataQues.map((question, index) => {
            return (
              <div className="question" key={question.id}>
                {index + 1}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RightContent;
