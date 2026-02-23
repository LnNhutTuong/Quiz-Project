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
      <div className="header">
        <div className="title">Dashboard</div>
        <div className="breadcumb">Dashboad/skibidi</div>
      </div>
      <div className="content">
        <div className="analys">
          <div className="total users">
            <div className="info">
              <span>{dataView?.users?.total}</span>
              <br />
              Total User
            </div>
            <div className="btn more-info">More info</div>
          </div>

          <div className="total quizzes">
            <div className="info">
              <span>{dataView?.others?.countQuiz}</span>
              <br />
              Total Quizzes
            </div>
            <div className="btn more-info">More info</div>
          </div>

          <div className="total questions">
            <div className="info">
              <span> {dataView?.others?.countQuestions}</span>
              <br />
              Total Questions
            </div>

            <div className="btn more-info">More info</div>
          </div>
          <div className="total answers">
            <div className="info">
              {dataView?.others?.countAnswers}
              <br />
              Total Answer
            </div>

            <div className="btn more-info">More info</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
