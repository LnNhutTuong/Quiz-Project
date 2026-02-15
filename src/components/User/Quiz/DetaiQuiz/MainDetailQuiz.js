import { useState } from "react";
import LeftContent from "./LeftContent";
import RightContent from "./RightContent";

const MainDetailQuiz = () => {
  const [dataQues, setDataQues] = useState([]);
  const [indexA, setIndexA] = useState(0);
  return (
    <div className="detail-quiz-container container">
      <div className="left-content">
        <LeftContent
          dataQues={dataQues}
          setDataQues={setDataQues}
          indexA={indexA}
          setIndexA={setIndexA}
        />
      </div>

      <div className="right-content">
        <RightContent
          dataQues={dataQues}
          setDataQues={setDataQues}
          indexA={indexA}
          setIndexA={setIndexA}
        />
      </div>
    </div>
  );
};

export default MainDetailQuiz;
