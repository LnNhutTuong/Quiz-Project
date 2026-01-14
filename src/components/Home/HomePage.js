import videoHomePage from "../../assets/video/homepage.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const navigate = new useNavigate();

  const handleAuthenticatedClick = () => {
    navigate(`/user`);
  };

  const handleNotAuthenticatedClick = () => {
    navigate(`/login`);
  };
  return (
    <div className="homepage-container">
      <div className="homepage-video">
        <video autoPlay muted loop>
          <source type="video/webm" src={videoHomePage} />
        </video>
      </div>

      <div className="homepage-content">
        <div className="title">Đừng dừng lại ở đây</div>
        <div className="mota">
          Thành công không đến từ việc bắt đầu, mà từ việc không bỏ cuộc. Mỗi
          bước nhỏ hôm nay đều đưa bạn tiến gần hơn tới mục tiêu hoặc không.
        </div>

        {isAuthenticated === true ? (
          <div className="btn-title" onClick={() => handleAuthenticatedClick()}>
            <button>Tiếp tục</button>
          </div>
        ) : (
          <div
            className="btn-title"
            onClick={() => handleNotAuthenticatedClick()}
          >
            <button>Tiếp tục</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
