import { useEffect, useState } from "react";
import { getOverview } from "../../../API/services/admin.service";
import { toast } from "react-toastify";

const Dashboard = (props) => {
  const [dataView, setDataView] = useState(``);

  useEffect(() => {
    fetchOverview();
  }, []);

  const fetchOverview = async () => {
    const res = await getOverview();
    console.log(">>>>Check res: ", res);
    if (res && res.EC === 0) {
      toast.success("Have a good day!");
      setDataView(res.DT);
    } else {
      toast.error("Hôm nay mưa");
    }
    console.log(">>>Check data: ", dataView);
  };

  return (
    <div className="dashboard-container">
      <div className="title">Xin chào, my boy ♥</div>
      <div className="content">
        <div className="analys">
          <div className="total">
            Total User <br />
            {dataView?.users?.total}
          </div>
          <div className="total">
            Total Quizzes
            <br />
            {dataView?.others?.countQuiz}
          </div>
          <div className="total">
            Total Questions
            <br />
            {dataView?.others?.countQuestions}
          </div>
          <div className="total">
            Total Answer
            <br />
            {dataView?.others?.countAnswers}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
