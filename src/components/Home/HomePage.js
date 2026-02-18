import videoHomePage from "../../assets/video/homepage.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const navigate = new useNavigate();

  const { t } = useTranslation();

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
        <div className="title">{t("homepage.title")}</div>
        <div className="description">{t("homepage.description")}</div>

        {isAuthenticated === true ? (
          <div className="btn-title" onClick={() => handleAuthenticatedClick()}>
            <button>{t("homepage.btn-next")}</button>
          </div>
        ) : (
          <div
            className="btn-title"
            onClick={() => handleNotAuthenticatedClick()}
          >
            <button>{t("homepage.btn-next")}</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
