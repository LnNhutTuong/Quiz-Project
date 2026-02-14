import LeftContent from "./LeftContent";
import RightContent from "./RightContent";

const MainDetailQuiz = (props) => {
  return (
    <div className="detail-quiz-container container">
      <div className="left-content">
        <LeftContent />
      </div>

      <div className="right-content">
        <RightContent />
      </div>
    </div>
  );
};

export default MainDetailQuiz;
