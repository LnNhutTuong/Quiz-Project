import videoHomePage from "../../assets/video/homepage.mp4";
import { useSelector } from "react-redux";

const HomePage = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);

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
        <div className="btn-title">
          <button>Tiếp tục</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
