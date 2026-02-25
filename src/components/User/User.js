import ListQuiz from "./Quiz/ListQuiz";
import "../../assets/styles/User/user.scss";
import sleepingBoy from "../../assets/img/sleepingboy.png";

const User = (props) => {
  return (
    <div className="user-container container">
      <div className="right">
        <div className="information">
          <div className="avatar">
            <img src={sleepingBoy} alt="your avatar" />
          </div>
          <div className="info">
            <div className="name">Tên: Tôi là tôi</div>
            <div className="email">Email: skibidi@gmail.com</div>
          </div>
        </div>
      </div>
      <div className="left">
        <div className="title">Quiz của bạn:</div>
        <div className="content">
          <ListQuiz />
        </div>
      </div>
    </div>
  );
};

export default User;
