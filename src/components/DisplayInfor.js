import React from "react";
import "./DisplayInfor.scss";
import logo from "./../logo.svg";
class DisplayInfor extends React.Component {
  state = {
    isShow: true,
  };

  handleOnClick = (event) => {
    this.setState({
      isShow: !this.state.isShow,
    });
  };

  render() {
    // sandwich fucking sandwich
    const { listUsers } = this.props;
    // sandwich fucking sandwich

    return (
      <div className="display-infor-container">
        <img src={logo} />
        <div>
          <div>
            {/* su dung nen () */}
            <span onClick={() => this.handleOnClick()}>
              {this.state.isShow === true
                ? "Hide list users"
                : "Show list users"}
            </span>
          </div>
        </div>

        {this.state.isShow && (
          <div>
            {listUsers.map((user) => {
              return (
                <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
                  <hr />
                  <div>My name's {user.name} </div>
                  <div>My age' {user.age}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default DisplayInfor;
