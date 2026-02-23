import { useEffect, useState } from "react";
import { getOverview } from "../../../API/services/admin.service";
import { toast } from "react-toastify";
import Breadcrumb from "react-bootstrap/Breadcrumb";

import { FaUser } from "react-icons/fa";
import { SiQuizlet } from "react-icons/si";
import { FaQuestion } from "react-icons/fa";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";

import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { BreadcrumbItem } from "react-bootstrap";

const Dashboard = (props) => {
  const [dataView, setDataView] = useState(``);

  const navigate = useNavigate();
  const location = useLocation();

  console.log(">>>Check location: ", location);

  useEffect(() => {
    fetchOverview();
  }, []);

  const fetchOverview = async () => {
    const res = await getOverview();
    if (res && res.EC === 0) {
      toast.success("Have a good day!");
      setDataView(res.DT);
    } else {
      toast.error("Hôm nay mưa");
    }
    console.log(">>>Check data: ", dataView);
  };

  const handleUsers = () => {
    navigate("/admin/manage-user");
  };

  const handleQuizzes = () => {
    navigate("/admin/manage-quiz");
  };

  const handleQuestions = () => {
    navigate("/admin/manage-question");
  };

  const handleAnswers = () => {
    navigate("/admin/manage-question");
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <div className="title">Dashboard</div>
        <div className="breadcrumb">
          <Breadcrumb>
            <NavLink to="/admin" className="breadcrumb-item">
              Home
            </NavLink>
            <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="content">
        <div className="analys">
          <div className="total users">
            <div className="info">
              <div className="total">
                {dataView?.users?.total}
                <br />
                Total User
              </div>
              <div className="logo">
                <FaUser />
              </div>
            </div>
            <div className="btn more-info" onClick={() => handleUsers()}>
              More info <FaArrowRight />
            </div>
          </div>

          <div className="total quizzes">
            <div className="info">
              <div className="total">
                {dataView?.others?.countQuiz}
                <br />
                Total Quizzes
              </div>
              <div className="logo">
                <SiQuizlet />
              </div>
            </div>
            <div className="btn more-info" onClick={() => handleQuizzes()}>
              More info <FaArrowRight />
            </div>
          </div>

          <div className="total questions">
            <div className="info">
              <div className="total">
                {dataView?.others?.countQuestions}
                <br />
                Total Questions
              </div>
              <div className="logo">
                <FaQuestion />
              </div>
            </div>
            <div className="btn more-info" onClick={() => handleQuestions()}>
              More info <FaArrowRight />
            </div>
          </div>

          <div className="total answers">
            <div className="info">
              <div className="total">
                {dataView?.others?.countAnswers}
                <br />
                Total Answer
              </div>
              <div className="logo">
                <RiQuestionAnswerFill />
              </div>
            </div>

            <div className="btn more-info" onClick={() => handleAnswers()}>
              More info <FaArrowRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
