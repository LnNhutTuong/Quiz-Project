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
  }, [id]);

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
          />
        </div>

        <div className="question-footer">
          <button className="btn-prev">Prev</button>
          <button className="btn-next">Next</button>
        </div>
      </div>

      <div className="right-content">count down</div>
    </div>
  );
};

export default DetailQuiz;
