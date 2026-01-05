import videoHomePage from "../../assets/homepage.mp4";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <video autoPlay muted loop>
        <source type="video/webm" src={videoHomePage} />
      </video>
    </div>
  );
};

export default HomePage;
