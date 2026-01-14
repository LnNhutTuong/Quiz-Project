import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz } from "../../../API/services/quiz.service";
import "../../../assets/styles/Quiz/DetailQuiz.scss";
import _ from "lodash";
const DetailQuiz = (props) => {
  const params = new useParams();
  const location = useLocation();

  console.log("><>>>>location:", location);

  const id = params.id;

  const fetchQuestion = async () => {
    const res = await getDataQuiz(id);

    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        // Group the elements of Array based on `id` property
        .groupBy("id")
        // `key` is group's name (id), `value` is the array of objects
        .map((value, key) => {
          let answer = [];
          let questionDescription,
            image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.answers.dedescription;
              image = item.answers.image;
            }
            answer.push(item.answers);
          });

          return { id: key, answer, questionDescription, image };
        })
        .value();
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
        <div className="question-body">
          <img src="" alt="" />
        </div>
        <div className="question-content">
          <div className="question">
            Question 1: ai la nguoi manh nhat trai dat
          </div>
          <div className="answers">
            <div className="choose">A. </div>
            <div className="choose">B. </div>
            <div className="choose">C. </div>
          </div>
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
